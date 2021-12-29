module.exports = {
    "git": {
        "commitMessage": "chore: release v${version}",
        "changelog": "npx auto-changelog --stdout --commit-limit false --unreleased --template https://raw.githubusercontent.com/release-it/release-it/master/templates/changelog-compact.hbs"
    },
    "github": {
        "release": true
    },
    "npm": {
        "publish": false
    },
    "hooks": {
        "after:bump": "npx auto-changelog -p"
    }
}