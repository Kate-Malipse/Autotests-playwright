class Helper {   

    static GenerateProjectCode() {
        let allCaps = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array(5)
            .fill()
            .map(() => allCaps.charAt(Math.random()*allCaps.length))
            .join('');
    }
}

const Constants = {

    SITE: 'https://office.ideadeploy.space/',
    //on request 
    VALIDLOGIN: '', 
    VALIDPASSWORD: ''
}


module.exports = { Helper, Constants }
