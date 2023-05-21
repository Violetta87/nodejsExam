<script>
    import { BASE_URL } from "../store/base_url";

    async function getMCs(){
        try{
            const response = await fetch($BASE_URL + "/harleys");
        }
        catch(error){
            console.log(error);

        }
        

    }
</script>

<h1>You can see this page without being logged in.</h1>