<template>
    <div class="login-div">
        <h1 id="mainHead">CRYPTO PAPER PORTFOLIO</h1>
        <div id="firebaseui-auth-container"></div>
        <div id="pagecontent">
            Crypto Paper Porfolio (CPP) is an app to track your crypto porfolio. <br>
            Enter coin details and get real time Profit and Loss update of your Porfolio.
        </div>
        <h5>Copyright@CPP-2024</h5>
    </div>
</template>

<script>
import firebase from '@/uifire.js';
import 'firebase/compat/auth';
import * as firebaseui from 'firebaseui';
import 'firebaseui/dist/firebaseui.css';

export default {
    name: "Login",

    mounted() {
        var ui = firebaseui.auth.AuthUI.getInstance();

        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }

        var uiConfig = {
            signInSuccessUrl: '/home',
            signInOptions: [
                firebase.auth.EmailAuthProvider.PROVIDER_ID,
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            ],
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
}
</script>

<style scoped>
.login-div {
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 10px;
    width: 50%;
    margin: 0 auto;
    text-align: center;
}

#firebaseui-auth-container {
    padding: 10px;
}

#pagecontent {
    padding: 10px;
}

#mainHead {
    color: #2c305d;
    font-size: 2em;
    letter-spacing: 0.05em;
}

h5 {
    color: #2c305d;
    font-size: 1em;
    letter-spacing: 0.05em;
}
</style>