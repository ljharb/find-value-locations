# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.0.5](https://github.com/ljharb/find-value-locations/compare/v2.0.4...v2.0.5) - 2023-04-20

### Commits

- [Refactor] use `safe-array-concat` [`ea5d5ca`](https://github.com/ljharb/find-value-locations/commit/ea5d5caac2a25172363f6c2b31141bb3a7881bca)
- [Dev Deps] update `@ljharb/eslint-config`, `aud`, `tape` [`82f44eb`](https://github.com/ljharb/find-value-locations/commit/82f44eb77af812c771b6a0f5ceab7d6b2795b05f)
- [Deps] update `reflect.ownkeys` [`ec21489`](https://github.com/ljharb/find-value-locations/commit/ec21489287b637cdbab116a0f9b008cc6294b1c5)

## [v2.0.4](https://github.com/ljharb/find-value-locations/compare/v2.0.3...v2.0.4) - 2022-10-26

### Commits

- [actions] reuse common workflows [`9106e9e`](https://github.com/ljharb/find-value-locations/commit/9106e9e5e9d90c982b1bae57f75904d477f43b40)
- [actions] use `node/install` instead of `node/run`; use `codecov` action [`4ce0676`](https://github.com/ljharb/find-value-locations/commit/4ce06761e44b43e66ec6a0ebcafce0a6f4e7ca0a)
- [meta] use `npmignore` to autogenerate an npmignore file [`eb8d290`](https://github.com/ljharb/find-value-locations/commit/eb8d290c65548335e512d2b64d0819d7f2f15ace)
- [readme] add github actions/codecov badges; update URLs [`31bcb87`](https://github.com/ljharb/find-value-locations/commit/31bcb87083b52d8010787a2fa7f2ba7d7e862dc1)
- [meta] add `auto-changelog` [`c5511e7`](https://github.com/ljharb/find-value-locations/commit/c5511e7bc748aa85cadf8d4b6c71adbe79c482a5)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `safe-publish-latest`, `tape` [`d4519b0`](https://github.com/ljharb/find-value-locations/commit/d4519b0e320df4e92be059597772c454dcea5974)
- [actions] update codecov uploader [`2734bda`](https://github.com/ljharb/find-value-locations/commit/2734bda93b1a0acef21d2ff17d1a8d25fbe93803)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `object.assign`, `tape` [`38a643c`](https://github.com/ljharb/find-value-locations/commit/38a643c8bf3937eed0ff63ede2d332c19e9d16f6)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `safe-publish-latest`, `tape` [`d3d33e5`](https://github.com/ljharb/find-value-locations/commit/d3d33e54d1f7ffbf0ffdd3f05b1883e7347a0a5b)
- [actions] update checkout action [`53bfb65`](https://github.com/ljharb/find-value-locations/commit/53bfb65a42263ea452506e8269c46b604d4bb421)
- [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `aud`, `tape` [`a81bc56`](https://github.com/ljharb/find-value-locations/commit/a81bc56b96d6fa3096714fa3503984e03c8313b1)
- [Refactor] use `for-each` instead of `foreach` [`cd7f8e0`](https://github.com/ljharb/find-value-locations/commit/cd7f8e0d46fe79f1c3007b32374eca59c61d6a5a)
- [meta] use `prepublishOnly` script for npm 7+ [`0195330`](https://github.com/ljharb/find-value-locations/commit/0195330a877b952e0078b7ac3a893fa850a388d9)
- [Deps] update `foreach` [`f8cc916`](https://github.com/ljharb/find-value-locations/commit/f8cc916d08fe2d420063e88da069c29e436d5a6d)
- [Deps] update `reflect.ownkeys` [`927a33b`](https://github.com/ljharb/find-value-locations/commit/927a33b722e342ca8e35dbd92a471c610cf15e47)
- [Deps] update `object-is` [`64a5217`](https://github.com/ljharb/find-value-locations/commit/64a5217b6b9ac27376ad4f964b7d9b9baf36e493)

<!-- auto-changelog-above -->

2.0.3 / 2021-01-22
=================
  * [Robustness / Refactor] use `reflect.ownkeys` and `call-bind`
  * [Deps] update `object-is`
  * [meta] do not publish github action workflow files
  * [meta] only run `aud` on prod deps
  * [Tests] migrate tests to Github Actions
  * [Tests] run `nyc` on all tests; use `tape` runner
  * [actions] add "Allow Edits" workflow
  * [actions] switch Automatic Rebase workflow to `pull_request_target` event
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `object.assign`, `tape`; add `safe-publish-latest`

2.0.2 / 2019-12-17
=================
  * [readme] fix repo URLs, remove testling
  * [Deps] update `object-is`, `object-keys`, `protochain`
  * [Dev Deps] update `eslint`, `@ljharb/eslint-config`, `tape`, `covert`, `object.assign`
  * [Tests] use shared travis-ci configs
  * [Tests] use `npx aud` instead of `nsp` or `npm audit` with hoops
  * [Tests] remove `jscs`
  * [meta] remove unused Makefile and associated utilities
  * [meta] add `funding` field; create FUNDING.yml
  * [meta] Only apps should have lockfiles
  * [actions] add automatic rebasing / merge commit blocking

2.0.1 / 2016-03-28
=================
  * [Fix] fix ES3 browsers (lacking `Object.getOwnPropertyNames`)
  * [Deps] update `object-keys`
  * [Dev Deps] update `jscs`, `nsp`, `eslint`, `@ljharb/eslint-config`, `semver`
  * [Docs] Switch from vb.teelaun.ch to versionbadg.es for the npm version badge SVG
  * [Tests] up to `node` `v5.9`, `v4.4`
  * [Tests] use pretest/posttest for linting/security

2.0.0 / 2015-08-06
=================
  * Ensure that throw-on-get properties do not cause findValue to throw.

1.1.1 / 2015-08-06
=================
  * [Fix] Make sure own properties are searched too.
  * [Fix] `Function.prototype.{arguments, caller}` throws on [[Get]] in newer v8
  * [Deps] Update `protochain`, `
  * [Dev Deps] Update `eslint`, `tape`, `object.assign`, `semver`, `jscs`
  * [Dev Deps] Add my personal shared `eslint` config
  * [Tests] Test up to latest `io.js`

1.1.0 / 2015-06-26
=================
  * provide descriptors in the tuple also

1.0.0 / 2015-06-25
=================
  * Initial release.
