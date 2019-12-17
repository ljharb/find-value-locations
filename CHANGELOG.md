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
