# JWKS Key Generator (SingPass MyInfo)

A Node.js application to generate JWKS keys. When you run `npm start`, it will automatically generate the `keys` folder along with the following files:
- `enc-key.pem`
- `jwks.json`
- `sig-key.pem`

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/lwinkoko92dev/JWKS-Key-Generator.git
    cd jwks-key-generator
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

To generate the keys, simply run:
```bash
npm start
