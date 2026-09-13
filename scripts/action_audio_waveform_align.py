#!/usr/bin/env python3
"""Correlate a synthesized timing reference with the exact stored action MP3."""

import json
import subprocess
import sys

import numpy as np

SAMPLE_RATE = 2000
MAX_OFFSET_MS = 250


def decode(path):
    process = subprocess.run(
        [
            "ffmpeg", "-v", "error", "-i", path, "-ac", "1", "-ar",
            str(SAMPLE_RATE), "-f", "f32le", "-",
        ],
        check=True,
        capture_output=True,
    )
    return np.frombuffer(process.stdout, dtype="<f4").astype(np.float64)


def correlation_at(stored, reference, lag):
    if lag >= 0:
        left = stored[lag:]
        right = reference
    else:
        left = stored
        right = reference[-lag:]
    length = min(len(left), len(right))
    if length < SAMPLE_RATE // 4:
        return -1.0
    left = left[:length]
    right = right[:length]
    # Silence must not inflate confidence: score only frames where either
    # recording carries meaningful energy.
    active = np.maximum(np.abs(left), np.abs(right)) > 0.001
    if np.count_nonzero(active) < SAMPLE_RATE // 10:
        return -1.0
    left = left[active]
    right = right[active]
    denominator = np.linalg.norm(left) * np.linalg.norm(right)
    return float(np.dot(left, right) / denominator) if denominator else -1.0


def main():
    if len(sys.argv) != 3:
        raise SystemExit("usage: action_audio_waveform_align.py stored.mp3 reference.mp3")
    stored = decode(sys.argv[1])
    reference = decode(sys.argv[2])
    limit = round(MAX_OFFSET_MS * SAMPLE_RATE / 1000)
    scores = [(correlation_at(stored, reference, lag), lag) for lag in range(-limit, limit + 1)]
    correlation, lag = max(scores)
    print(json.dumps({
        "offsetMs": round(lag * 1000 / SAMPLE_RATE, 1),
        "correlation": round(correlation, 6),
        "storedDurationMs": round(len(stored) * 1000 / SAMPLE_RATE, 1),
        "referenceDurationMs": round(len(reference) * 1000 / SAMPLE_RATE, 1),
    }))


if __name__ == "__main__":
    main()
