from trinsicokapi import oberon
from trinsicokapi.proto.okapi.security.v1 import *

key = oberon.create_key(CreateOberonKeyRequest())
data = bytes("alice", "utf8")
nonce = bytes("1234", "utf8")

issuer_2fa = bytes("issuer code", "utf8")
token_request = CreateOberonTokenRequest(data=data, sk=key.sk)
token_response = oberon.create_token(token_request)

user_pin = bytes("0000", "utf-8")
blind_request = BlindOberonTokenRequest(token=token_response.token)
blind_request.blinding.append(user_pin)
blinded_token = oberon.blind_token(blind_request)

proof_request = CreateOberonProofRequest(data=data, nonce=nonce, token=blinded_token.token)
proof_request.blinding.append(user_pin)
proof_response = oberon.create_proof(proof_request)

result = oberon.verify_proof(VerifyOberonProofRequest(data=data, nonce=nonce, pk=key.pk, proof=proof_response.proof))

print(f"Demo w/ blinding complete. Result={result.valid}")