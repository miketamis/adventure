# Phrase audio: composition and storage study

Date: 2026-09-09

## Decision

Keep phrase-level synthesis for phrase listening. Do not rebuild learner-facing
phrases by joining the current isolated-word recordings.

The proposed timing-reference approach can remove silence and reproduce the
duration of a reference sentence, but it cannot recover the information that
is absent from isolated recordings: sentence intonation, word-boundary
coarticulation, reductions, stress, and punctuation phrasing. Those are the
features that fixed the original robotic, word-at-a-time playback.

The worthwhile compression path is to keep each phrase as one synthesis, trim
only its outer padding, and encode it as speech-optimised Opus. Azure exposes a
24 kHz, 24 kbps WebM/Opus output. For the best result, request PCM from Azure,
trim the leading/trailing silence while preserving every internal pause, then
encode once to Opus. Keep an MP3 fallback until the project's
supported-browser floor has been tested.

## Measured baseline

The experiment used the 120 phrase recordings present during the measurement.
All byte counts are raw file sizes, not filesystem block usage.

| Asset set | Count | Bytes | MiB |
| --- | ---: | ---: | ---: |
| All current pronunciation MP3s | 2,150 | 19,794,240 | 18.88 |
| Continuous phrase MP3s | 120 | 1,530,288 | 1.46 |
| Unique isolated words used by those phrases | 196 | 1,706,832 | 1.63 |

Continuous phrase recordings are 7.7% of the current audio archive. Across
individual cold phrase plays, fetching all component-word files would transfer
2.31 times as many bytes as fetching the continuous phrase file. Reuse makes
the word cache cheaper over a long session, but it does not make the first
listening play cheaper.

The generated files also contain substantial outer padding. Retaining 40 ms at
the start and 80 ms at the end removed 106.73 seconds from the measured 255.05
seconds without touching internal punctuation pauses or speech. That is 41.8%
of the encoded duration (median removable padding: 165 ms before speech and
715 ms after speech). This is the safest saving because the player never needs
to download trailing silence.

There is also little useful reuse in larger natural units. In the 120 measured
phrases, 298 bigram occurrences produce 257 unique bigrams; only 24 bigram
types recur. A bigram/trigram recording bank would therefore approach or
exceed the phrase count while still lacking whole-sentence intonation.

## Offline composition prototype

The prototype decoded the current MP3s to 24 kHz mono PCM, detected and removed
leading/trailing silence, joined isolated words with a small boundary gap, and
tempo-matched the result to its continuous reference with pitch-preserving
offline time stretching. It did not change or delete any production asset.

Across 120 phrases, the sum of isolated-word **voiced** durations was 1.31
times the continuous recording at the median (10th–90th percentile: 1.13–1.49;
range: 0.93–1.63). A single fixed pause or speed rule therefore cannot make the
bank natural. It requires phrase-specific timing before considering pitch and
coarticulation.

A bounded four-phrase comparison covered 2-, 3-, 5-, and 7-word utterances. A
log-mel dynamic-time-warping distance gave these medians:

| Candidate compared with continuous MP3 | Median distance |
| --- | ---: |
| Timing-matched isolated-word composition | 0.2204 |
| Same continuous phrase transcoded to 16 kbps Opus | 0.0239 |

This is an engineering similarity measure, not a listener quality score, and
the sample is intentionally small. It is useful directionally: retaining the
continuous performance while changing codec stayed about nine times closer to
the reference than timing-matched word composition.

## Codec prototype

The 120 continuous MP3s were transcoded in a temporary directory to compare
archive sizes. Production generation should request the target codec directly,
so these results are conservative for quality.

| Encoding | Bytes | Current size | Saving |
| --- | ---: | ---: | ---: |
| Current 48 kbps MP3 | 1,530,288 | 100.0% | — |
| 32 kbps MP3 | 1,071,672 | 70.0% | 458,616 bytes |
| 32 kbps AAC/M4A | 949,781 | 62.1% | 580,507 bytes |
| 24 kbps Opus/Ogg | 607,240 | 39.7% | 923,048 bytes |
| 16 kbps Opus/Ogg | 426,990 | 27.9% | 1,103,298 bytes |

Applying the outer-silence trim before encoding produced a larger saving:

| Trimmed encoding | Bytes | Current size | Saving |
| --- | ---: | ---: | ---: |
| 48 kbps MP3 | 888,408 | 58.1% | 641,880 bytes |
| 24 kbps Opus/Ogg | 435,185 | 28.4% | 1,095,103 bytes |
| 16 kbps Opus/Ogg | 304,404 | 19.9% | 1,225,884 bytes |

For the first production trial, use Azure's
`webm-24khz-16bit-24kbps-mono-opus` rather than the experimental Ogg files. The
24 kbps setting is the safer quality target for clear language learning; test
16 kbps only through blind Albanian-speaker listening.

Microsoft's output-format documentation lists the 24 kHz, 24 kbps WebM/Opus
format:
<https://learn.microsoft.com/en-us/dotnet/api/microsoft.cognitiveservices.speech.speechsynthesisoutputformat>

MDN documents Web Audio's sample-accurate scheduling, which would solve gaps
between decoded units, but also notes that `AudioBufferSourceNode.playbackRate`
resamples without pitch correction. Natural runtime tempo matching would need
additional time-stretch DSP, buffering, and CPU:

- <https://developer.mozilla.org/en-US/docs/Web/API/AudioScheduledSourceNode/start>
- <https://developer.mozilla.org/en-US/docs/Web/API/AudioBufferSourceNode>

## Why reference timings are not a compact phrase generator

Forced alignment or Azure word-boundary metadata can tell us *when* words were
spoken in the full reference. We could then store compact timing, gain, and
crossfade parameters. Those parameters do not turn an isolated pronunciation
into the contextual sound from the sentence. In particular:

- a question and statement have different contours even when they reuse words;
- adjacent sounds change at word boundaries;
- isolated-word clips are deliberately slower and often carry final-word
  prosody;
- punctuation creates variable pauses that are not captured by a word list;
- browser-side tempo correction either shifts pitch or needs custom DSP.

To reproduce the reference exactly, the reusable inventory would need
context-conditioned phone/diphone units plus prosody prediction, or a compact
neural speech/codec model. That is a text-to-speech engine, not an audio
concatenator. Its model and runtime cost are disproportionate to the current
1.46 MiB phrase archive.

## Recommended rollout

1. Preserve the current continuous MP3 phrase path as the quality baseline.
2. Extend the downloader to request PCM for phrase surfaces, remove only outer
   silence (retaining a short 40/80 ms cushion), and encode once as 24 kbps
   WebM/Opus. Do not use a silence-removal mode that collapses internal pauses.
3. Make runtime audio choose Opus when `canPlayType` confirms support, with MP3
   fallback during the compatibility trial.
4. Run an ABX check with Albanian speakers on at least 30 phrases, deliberately
   including questions, contractions, commas, two-clause answers, and 6+ word
   phrases.
5. If Opus passes, remove phrase MP3 fallbacks. At the measured curriculum size,
   that should save about 1.0 MiB at trimmed 24 kbps while retaining natural
   prosody.
6. Consider converting the much larger isolated-word archive afterward; that is
   where most storage savings are available.

Do not replace continuous phrase playback with isolated composition unless a
blind listening test shows equivalence. The timing prototype does not meet that
bar.
