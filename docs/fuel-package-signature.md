# FUEL Package Signature

## Signature Contents

The signature `signature.json` is a JSON file containing a base64 encoded SHA256 digest for each file in the package and a base64 encoded PKCS#7 signature covering that set of digests.

Example
{
    "contents": {
        "./manifest.json":<digest>,
        "./default/server.json":<digest>
        "./default/index.html":<digest>
    },
    "signature":<signature>
}

## Package Validation

- Confirm the signature is valid and covers the entire value of `contents`
- Validate that every file in the package is listed in the signature `contents` object at the correct path. If not, validation fails.
- Validate that every file listed in the signature `contents` object is in the package at the correct path. If not, validation fails.
- For each file listed in the signature manifest
  - Extract the file
  - Digest the entire file using SHA-256
  - Compare against the digest contained in the signature manifest
  - If comparison fails, validation has failed.

