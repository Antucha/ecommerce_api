export interface TokenRepository {
    generate(content)

    verify (token)

    decode (token)
}