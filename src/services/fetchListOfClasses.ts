export default async function fetchListOfClasses(
  user: string
): Promise<{ id: any; name: string }[]> {
  let response = await fetch(`http://localhost:8000/${user}`, {
    method: "GET",
    mode: "cors",
    headers: { Origin: "localhost:8000", "Content-Type": "application/json" },
  });
  if (response.status === 200) {
    let listOfClasses = await response.json();
    return listOfClasses.classList;
  } else {
    return [{ id: `${response.status}`, name: "error" }];
  }
}
