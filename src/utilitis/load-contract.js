import contract from "@truffle/contract"

export const loadContractor = async (name, provider) => {
 const res = await fetch(`/contracts/${name}.json`)
 const Artifacts = await res.json()
const _contract = contract(Artifacts)
_contract.setProvider(provider)

let deplotedContract = null

try {
     deplotedContract = await _contract.deployed()

} catch {
console.error("You are connected to the wrong network.")
}


return  deplotedContract
}