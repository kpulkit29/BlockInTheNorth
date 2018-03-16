var app=angular.module("app",["ngMaterial"]);
app.controller("control1",function($scope,$timeout, $mdSidenav){
    //variables
    $scope.currentTab='register';
    $scope.mystr='';
    ////
    if (typeof web3 !== 'undefined') {
        web3 = new Web3(web3.currentProvider);
    } else {
        // set the provider you want from Web3.providers
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    }
    web3.eth.defaultAccount = web3.eth.accounts[0];
    
    var CoursetroContract = web3.eth.contract([
        {
            "constant": false,
            "inputs": [
                {
                    "name": "_to",
                    "type": "address"
                },
                {
                    "name": "on",
                    "type": "string"
                },
                {
                    "name": "body",
                    "type": "string"
                },
                {
                    "name": "by",
                    "type": "address"
                }
            ],
            "name": "add",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": false,
                    "name": "_issuedto",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "name": "body",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "issued_on",
                    "type": "string"
                },
                {
                    "indexed": false,
                    "name": "by",
                    "type": "address"
                }
            ],
            "name": "fetch",
            "type": "event"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "user",
                    "type": "address"
                }
            ],
            "name": "getCerti",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "constructor"
        }
    ]);
    var check = CoursetroContract.at('0x780da07f75662df0ac4db7a9435ba517f32935cb');
    var recEvent=check.fetch();
    //populating list of  shops
    recEvent.watch(function(err,res){
       $scope.mystr=JSON.stringify(res);
       alert($scope.mystr);
    });
    // web3.eth.getBalance(web3.eth.accounts[2],function(err,bal){
    //   console.log(web3.fromWei(bal.toNumber(),"ether"));
    // });
    $scope.add=function(){
        check.add("0x7155c63cf964de6f28314cedcb156cc3520607eb","oo","pulkit","0x71e89317f86726c14d6132c2be3ee712004b67d7");
        check.add("0x71e89317f86726c14d6132c2be3ee712004b67d7","oo","pulkit","0x71e89317f86726c14d6132c2be3ee712004b67d7");
        check.getCerti("0x71e89317f86726c14d6132c2be3ee712004b67d7",function(err,res){
            if(err) throw err;
            console.log(res);
        });
    }

   check.getCerti("0x71e89317f86726c14d6132c2be3ee712004b67d7",function(err,res){
       if(err) throw err;
       console.log(res);
   });
   $scope.toggleLeft = buildToggler('left');
   $scope.toggleRight = buildToggler('right');

   function buildToggler(componentId) {
     return function() {
       $mdSidenav(componentId).toggle();
     };
   }
});
