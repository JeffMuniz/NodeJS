# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
<!-- - <message> [RH-<card-number>](https://projetoblue1.atlassian.net/browse/RH-<card-number>) by [@<user-name>](http://gitlab.conductor.tecnologia/<user-name>) -->

## [Unreleased]
## [1.9.0](http://gitlab.conductor.tecnologia/blue/app_blue/rh_front/compare/master...release-1.9.0) - 2019-04-29~2019-05-17
### Fixed
- Margin size employee's vouchers component. [RH-828](https://projetoblue1.atlassian.net/browse/RH-828) by [@frederico.oliveira](http://gitlab.conductor.tecnologia/frederico.oliveira)
- Change URLSearchParams to manual whay to manage url params. [RH-1505](https://projetoblue1.atlassian.net/browse/RH-1505) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
## [1.8.0](http://gitlab.conductor.tecnologia/blue/app_blue/rh_front/compare/master...release-1.8.0) - 2019-04-01~2019-04-26
### Added
- Ids for automation tests by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Tests for Access Permisson by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Flow to cancel a charge. [RH-1176](https://projetoblue1.atlassian.net/browse/RH-1176) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)

### Changed
- README.md [RH-1510](https://projetoblue1.atlassian.net/browse/RH-1510) by [@frederico.oliveira](http://gitlab.conductor.tecnologia/frederico.oliveira)
- It changes the way that subgroups and companies are get to fill subgroup selector. Instead of get it in two steps, for now, it will get both data in a single request and cache that. [RH-1413](https://projetoblue1.atlassian.net/browse/RH-1413) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- View of OrderCard Component when order failed or is processing. [RH-1414](https://projetoblue1.atlassian.net/browse/RH-1414) by [@eduardo.almeida.ext](http://gitlab.conductor.tecnologia/eduardo.almeida.ext)

### Fixed
- Selector options of issue a duplicate of the card. [RH-981](https://projetoblue1.atlassian.net/browse/RH-981) by [@eduardo.almeida.ext](http://gitlab.conductor.tecnologia/eduardo.almeida.ext)
- OrderCard Component to show correctly image of order status. [RH-1410](https://projetoblue1.atlassian.net/browse/RH-1410) by [@eduardo.almeida.ext](http://gitlab.conductor.tecnologia/eduardo.almeida.ext)
- Fix CI by [@andre.bassi.ext](http://gitlab.conductor.tecnologia/andre.bassi.ext)
- CompanyTree Component selector layout. [RH-967](https://projetoblue1.atlassian.net/browse/RH-967) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Name and address text size. [RH-824](https://projetoblue1.atlassian.net/browse/RH-824) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Align column "date of birth". [RH-825](https://projetoblue1.atlassian.net/browse/RH-825 ) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Margin size between items of period dropdown. [RH-826](https://projetoblue1.atlassian.net/browse/RH-826) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)

### Removed
- Native code by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Link to Employee page of third level of order. [RH-1417](https://projetoblue1.atlassian.net/browse/RH-1417) by [@eduardo.almeida.ext](http://gitlab.conductor.tecnologia/eduardo.almeida.ext)
## [1.7.0](http://gitlab.conductor.tecnologia/blue/app_blue/rh_front/compare/master...release-1.7.0) - 2019-03-11~2019-03-29
### Added
- In add user’s permission scene (user’s registry flow), was added an error message that indicates that the searched subgroup is not available for selecting. [RH-1090](https://projetoblue1.atlassian.net/browse/RH-1090) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Add `text-dectoration: line-through` on employee statement when purchase has cancelled or refunded status. [RH-712](https://projetoblue1.atlassian.net/browse/RH-712) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
### Changed
- Change cancel order flow. [RH-1143](https://projetoblue1.atlassian.net/browse/RH-1143) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Change validation of address. [RH-1226](https://projetoblue1.atlassian.net/browse/RH-1226) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Change the color of the word “importante” in datepicker. [RH-1073](https://projetoblue1.atlassian.net/browse/RH-1073) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
### Fixed
- Set up pt-BR UTC for hours on orders and statement. [RH-1258](https://projetoblue1.atlassian.net/browse/RH-1258) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- Block subgroup and company selector to open when there is just one option available. [RH-1403](https://projetoblue1.atlassian.net/browse/RH-1403) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- Fix event handle functions on add user permissions scene to prevent from breaking when trying to remove permission or close modal. [RH-1404](https://projetoblue1.atlassian.net/browse/RH-1090) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Vertically align order component and search component in withPagination component. [RH-823](https://projetoblue1.atlassian.net/browse/RH-823) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
### Removed
- Remove create password new password input’s wrong error message and remove wrong email from footer. [RH-701](https://projetoblue1.atlassian.net/browse/RH-701) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
- Remove shadow from all inputs. [RH-822](https://projetoblue1.atlassian.net/browse/RH-822) by [@marcos.apostolo.ext](http://gitlab.conductor.tecnologia/marcos.apostolo.ext)
## [1.6.0](http://gitlab.conductor.tecnologia/blue/app_blue/rh_front/compare/master...release-1.6.0) - 2019-02-18~2019-03-08
### Added
- Add OrderBy Component in AccessPermission Group Tab. [RH-1056](https://projetoblue1.atlassian.net/browse/RH-1056) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
### Changed
- Fix user searching to bring only users from selected company on card tracking. [RH-1210](https://projetoblue1.atlassian.net/browse/RH-1210) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- Add payment status column on orders dashboard. [RH-1097](https://projetoblue1.atlassian.net/browse/RH-1097) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- Add TED payment issue alert message on orders dashboard. [RH-1121](https://projetoblue1.atlassian.net/browse/RH-1121) by [@renan.neves](http://gitlab.conductor.tecnologia/renan.neves)
- Change URLS of api Blue to RH. [RH-1211](https://projetoblue1.atlassian.net/browse/RH-1211) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Change integration when download button of order sheet model is clicked. [RH-1091](https://projetoblue1.atlassian.net/browse/RH-1091) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Change label date. [RH-1076](https://projetoblue1.atlassian.net/browse/RH-1076) by [@frederico.oliveira](http://gitlab.conductor.tecnologia/frederico.oliveira)
### Fixed
- Fix request params when tracking api is called. [RH-1208](https://projetoblue1.atlassian.net/browse/RH-1208) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)
- Fix layout of dialogs. [RH-976](https://projetoblue1.atlassian.net/browse/RH-976) by [@vinicius.silva.ext](http://gitlab.conductor.tecnologia/vinicius.silva.ext)