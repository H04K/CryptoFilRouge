export class GetRequest {
    constructor(){}
    
    async getPosts() {
        try {
            const resp = await fetch("https://fakerapi.it/api/v1/texts?_quantity=5&_characters=100", {
                // method: 'GET',
                // headers: {
                //     'Accept': "application/json",
                //     'Content-Type': 'application/json'
                // }
            });
            const json_resp = await resp.json();
            // console.log(json_resp.data);
            return json_resp.data;
        } catch (errors) {
            console.error(errors);
        }
    }
}
