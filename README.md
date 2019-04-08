# Trezor onboarding

## Documented hacks

1. For localization, using this fork https://www.npmjs.com/package/@dragonraider5/react-intl instead of the official one 
https://github.com/yahoo/react-intl . Reason:
There is a bug (or a missing feature) that causes components either not to rerender after language changes
or unmount and mount whole tree again, for more info refer to this issue https://github.com/yahoo/react-intl/issues/1106 .
There is also a PR https://github.com/yahoo/react-intl/pull/1186 after it is merged, we can switch back to the offical lib.