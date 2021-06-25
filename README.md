# kin-starter-node

## About

This project is a simple demo of how to use the [kin-node](https://github.com/kinecosystem/kin-node) SDK.

## Requirements

- Basic Node and TypeScript knowledge
- Node 12 or 14
- Yarn 1.x or npm
- Docker (optional)

## Running this project

### 1. Clone the repo

```shell
git clone https://github.com/kintegrate/kin-starter-node.git
cd kin-starter-node
```

### 2. Install the dependencies

```shell
yarn install
# or if you prefer npm: npm install
```

### 3. Run the demo

```shell
yarn dev
# or if you prefer npm: npm run dev
```

## Docker

You can also run this project inside a Docker container:

```shell
make docker-build
make docker-run
```

## What's next?

You can read the [Getting Started - Node](https://kintegrate.dev/tutorials/getting-started-node-sdk) to read how you can integrate the `kin-node` SDK in your own apps.

If you have questions or want to talk about how to integrate Kin, please join our [discord channel](https://discord.gg/kdRyUNmHDn).
