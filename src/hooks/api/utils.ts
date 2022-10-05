

export const interpolate = (string: string, variables: any) => {
    return string.replace(/:([a-zA-Z]+)/g, (match, key) => variables[key]);
}