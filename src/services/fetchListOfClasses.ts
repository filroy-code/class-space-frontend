export default async function fetchListOfClasses(
  user: string
): Promise<{ id: any; name: string }[]> {
  let response = await fetch(`https://class-space.herokuapp.com/${user}`, {
    method: "GET",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
  });
  if (response.status === 200) {
    let listOfClasses = await response.json();
    return listOfClasses.classList;
  } else {
    return [{ id: `${response.status}`, name: "error" }];
  }
}
