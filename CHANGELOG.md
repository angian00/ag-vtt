# CHANGELOG

## Unreleased yet
### Added
- basic wiring of keyboard shortcuts
- info popup for tokens
- DiceRoller tool
	- modal div
	- shortcuts to change focus (x, d)
	- websocket round-trip 
- introduced redux-thunk to manage api calls in reducers:
	- authentication
	- initial sync of gameState as an HTTP REST req
- logout button


### Changed
- refactoring
	- converted to FogOfWar and GridLines to functional components
	- moved LoadedImage, MapImage, TokenImage to their own classes
	- redux integration
		- ChatPanel
		- LoginPage
	- reorganization of redux architecture:
		- state shape
		- reducers
		- actions


## [v0.2] - 2019-07-13
### Added
- drafts for ToolsPanel and InfoPanel
- view zoom
- basic architecture for multi-client broadcasting via websockets
- token decorations
	- HP/mana bars
	- weaponRange

### Changed
- refactored state management to use react-redux connect()

### Fixed
- issue with layout gridpage on chrome
- white border on bottom and right of map


## [v0.1] - 2019-07-09
### Added
- login in react
- page layout
- fixed map + draggable token
- state managed by redux
- fog of war
- (snappable) grid
- chat via websockets
