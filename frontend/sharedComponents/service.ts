


export function titleCase([val , ...rest] : string) {
    return val ? val[0].toUpperCase() + rest.join("") : (val + rest.join("")); 
}