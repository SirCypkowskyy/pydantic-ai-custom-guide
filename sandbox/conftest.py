"""Pytest configuration shared by every sandbox example.

Loads the repository ``.env`` before collection so smoke tests can decide whether to skip
based on ``OLLAMA_CLOUD_API_KEY``.
"""

from pai_sandbox_shared import load_env

load_env()
