# Guideline

## Thanks

I'm really glad that you're reading this, because your help would make this project even better and benefit more people.

## Best Practices

Since it is a small repo, there is not much restriction on how you should contribute. In general, just follow the guideline below.

If you are reporting an issue,

- There is no particular issue template, but please make sure that your issue contains your environment setup, library version, problem description, expected behavior, and current behavior.

If you are raising PR,

- You can get started by simply cloning/forking this repo, and running `yarn` in the project root directory.

- Make sure you've prettier plugin installed in your text editor/IDE. Prettify your codes automatically or through Prettier CLI before you commit any change.

- Test is easy and important for this project. Please make sure all tests pass before raising your PR. If you need to modify tests, make sure that test coverage does not decrease after your change.

- This repo uses commitlint. Please commit by running `yarn commit` instead of the regular `git commit` to make sure that you follow the format correctly.

- For the rest of scripts that may be useful for you. Please refer to the `scripts` content of [`package.json`](https://github.com/billykwok/use-recapture/blob/main/package.json).

- There is no particular PR template, but please make sure that your issue contains a clear list of what you've done, as well as what problem it solves and the related issues if applicable.

- Your PR will be tested again in the cloud using CircleCI. I will only merge PR that has a green status associated.

- Your PR will be reviewed and merged as soon as possible.
