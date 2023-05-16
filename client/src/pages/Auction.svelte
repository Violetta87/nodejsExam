<script>
    import { useNavigate } from 'svelte-navigator';
    import { user } from '../store/user.js'

    const navigate = useNavigate()

    if (!$user) {
        navigate('/')
    }
    
</script>

<h1>Not possible to enter without being signed in.</h1>