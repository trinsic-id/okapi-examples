import {
  BlindOberonTokenRequest,
  CreateOberonKeyRequest,
  CreateOberonProofRequest,
  CreateOberonTokenRequest, DIDKey,
  GenerateKeyRequest,
  KeyType,
  Oberon,
  VerifyOberonProofRequest,
} from "@trinsic/okapi-node";

async function generateKey() {
  const request = GenerateKeyRequest.fromPartial({keyType: KeyType.KEY_TYPE_BLS12381G1G2})
  const response = await DIDKey.generate(request);

  console.log(response.didDocument);
}

async function oberonKeyDemo() {
  let key = await Oberon.createKey(CreateOberonKeyRequest.fromPartial({}));
  let id = Buffer.from("test@example");
  let pin = Buffer.from("1234");
  let nonce = Buffer.from(Date.now().toString());

  let token = await Oberon.createToken(
    CreateOberonTokenRequest.fromPartial({sk: key.sk, data: id})
  );
  console.log(token);

  // optional step that allows the token to be blinded,
  // so it can be stored in plaintext with a pin
  let blindedToken = await Oberon.blindToken(
    BlindOberonTokenRequest.fromPartial({blinding: [pin], token: token.token})
  );

  let proof = await Oberon.createProof(
      CreateOberonProofRequest.fromPartial({token: blindedToken.token, data: id, nonce: nonce, blinding: [pin]})
  );
  console.log(proof);

  let isValid = await Oberon.verifyProof(
    VerifyOberonProofRequest.fromPartial({pk: key.pk, data: id, proof: proof.proof, nonce: nonce})
  );
  console.log(isValid);
}

async function main() {
  await generateKey();
  await oberonKeyDemo();
}

main();
