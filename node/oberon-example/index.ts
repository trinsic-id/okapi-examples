import {
  BlindOberonTokenRequest,
  CreateOberonKeyRequest,
  CreateOberonProofRequest,
  CreateOberonTokenRequest,
  Oberon,
  VerifyOberonProofRequest,
} from "@trinsic/okapi";

async function main() {
  let key = await Oberon.createKey(new CreateOberonKeyRequest());
  let id = Buffer.from("test@example");
  let pin = Buffer.from("1234");
  let nonce = Buffer.from(Date.now().toString());

  let token = await Oberon.createToken(
    new CreateOberonTokenRequest()
        .setData(id)
        .setSk(key.getSk())
  );
  console.log(token.toObject());

  // optional step that allows the token to be blinded,
  // so it can be stored in plaintext with a pin
  let blindedToken = await Oberon.blindToken(
    new BlindOberonTokenRequest()
        .setToken(token.getToken())
        .setBlindingList([pin])
  );

  let proof = await Oberon.createProof(
    new CreateOberonProofRequest()
      .setToken(blindedToken.getToken())
      .setData(id)
      .setNonce(nonce)
      // only required if blinding is used
      .setBlindingList([pin])
  );
  console.log(proof.toObject());

  let isValid = await Oberon.verifyProof(
    new VerifyOberonProofRequest()
      .setPk(key.getPk())
      .setData(id)
      .setProof(proof.getProof())
      .setNonce(nonce)
  );
  console.log(isValid.toObject());
}

main();
