from trinsicokapi import oberon
from trinsicokapi.proto.okapi.security.v1 import *

key = oberon.create_key(CreateOberonKeyRequest())
data = bytes("alice", "utf8")
nonce = bytes("1234", "utf8")

token = oberon.create_token(CreateOberonTokenRequest(data=data, sk=key.sk))
proof = oberon.create_proof(CreateOberonProofRequest(data=data, nonce=nonce, token=token.token))
result = oberon.verify_proof(VerifyOberonProofRequest(data=data, nonce=nonce, pk=key.pk, proof=proof.proof))

print(f"Demo complete. Result={result.valid}")