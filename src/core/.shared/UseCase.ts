interface UseCase<In, Out> {

    execute(request: In): Promise<Out>
}

export { UseCase }