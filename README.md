# Tiny stack VM

[![make.fun](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dann201-plg/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/dann201-plg/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

Entry for the [make.fun](https://make.fun) bounty
[Build a tiny stack virtual machine, 22 November 2026](https://make.fun/bounty/tiny-stack-vm-01-run-20261122).

A faithful interpreter of make.fun's tiny stack ISA v1. For every program in
`/input/<id>/program.bin` it writes the program's exact output to
`/output/<id>/stdout.bin` and its exit code to `/output/<id>/exit.txt`.

## Files

- `main.ts` — the VM (Node 22, standard library only).
- `LICENSE` — MIT.

## Verification

Scored 1,000,000 (40/40 instances exact) on the kit's practice set and on
three freshly drawn sets from the kit's own generator, using the kit's scorer.
