import { DIDKey, KeyType, GenerateKeyRequest } from "@trinsic/okapi-web";

async function generateKey() {
    const request = GenerateKeyRequest.fromPartial({keyType: KeyType.KEY_TYPE_ED25519})
    let response = await DIDKey.generate(request);

    let didDocument = response.didDocument;
    console.log(didDocument);

    document.getElementById("did-document").innerText = JSON.stringify(didDocument, null, "\t");
}

generateKey();