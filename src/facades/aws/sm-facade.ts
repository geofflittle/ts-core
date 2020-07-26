import { CreateSecretRequest, PutSecretValueRequest } from "aws-sdk/clients/secretsmanager"
import aws, { SecretsManager } from "aws-sdk"

const sm = new SecretsManager({ region: "us-east-1" })

export interface CreateSecretProps {
    name: string
}

export interface CreateSecretResponse {
    arn: string
}

export const createSecret = async ({ name }: CreateSecretProps): Promise<CreateSecretResponse> => {
    const req: CreateSecretRequest = { Name: name }
    console.log({ module: "sm-facade", method: "createSecret", req })
    const res = await sm.createSecret(req).promise()
    console.log({ module: "sm-facade", method: "createSecret", res })
    if (!res.ARN) {
        throw new Error(`Error creating secret with name ${name}`)
    }
    return {
        arn: res.ARN
    }
}

export interface PutSecretProps {
    secretArn: string
    secretValue: string
}

export interface PutSecretResponse {}

export const putSecretValue = async ({ secretArn, secretValue }: PutSecretProps): Promise<PutSecretResponse> => {
    const req: PutSecretValueRequest = {
        SecretId: secretArn,
        SecretString: secretValue
    }
    console.log({ module: "sm-facade", method: "putSecretValue", req })
    const res = await sm.putSecretValue(req).promise()
    console.log({ module: "sm-facade", method: "putSecretValue", res })
    if (!res.ARN) {
        throw new Error(`Error putting secret value for secret ${secretArn}`)
    }
    return {
        arn: res.ARN
    }
}
