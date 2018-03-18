var app=angular.module("app",["ngMaterial"]);
app.controller("control1",function($scope,$timeout, $mdSidenav,$mdDialog,$http){
    //variables
    $scope.super30=["Pulkit","Prachi"]
    $scope.currentTab='register';
    $scope.mystr='';
    $scope.certiCalled='';
    $scope.issuer={
    }
    $scope.issuer.to="";
    $scope.issuer.date="";
    $scope.issuer.from="";
    $scope.issuer.body="";
    //user.model
    $scope.user={};
    $scope.name="";
    $scope.git="";
    $scope.lin="";
    ////
    $scope.submit=function(){
        console.log($scope.user);
        $http.post("http://0e7db34f.ngrok.io/api/submit?name="+$scope.user.name+"&gb="+$scope.user.git+"&lin="+$scope.user.lin).then(res=>{
            var confirm = $mdDialog.confirm()
            .title('Done')
            .textContent('Account Saved')
            .ariaLabel('Lucky day')
            .ok('Please do it!')
  
      $mdDialog.show(confirm).then(function() {
  
      }, function() {
   
      });
      $scope.user.name="";
      $scope.user.git="";
      $scope.user.lin="";                     
        });
    }
    //to swtich Tans
    $scope.changeTab=function(str){
        $scope.currentTab=str;
    }
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
    var check = CoursetroContract.at('0x192d5cfdcdc0921633f832b66c2c4822824b5f18');
    var recEvent=check.fetch({}, 'latest');
    //populating list of  shops
    recEvent.watch(function(err,res){
        console.log(res);
        // // $mdDialog.show({
        // //     controller: DialogController,
        // //     template: "<div class='mymodal'><h1>Hackathon</h1><br><strong>Thanks for participation<strong><p>certified by me</p>",
        // //     parent: angular.element(document.body),
        // //     clickOutsideToClose:true,        
        // // })
        //   .then(function(answer) {
          
        //   }, function() {
            
        //   });
        
        if($scope.certiCalled.length>0){
            console.log(typeof(res.args._issuedto))
            jQuery('#qrcode').qrcode({
                render	: "table",
                text	: "http://0e7db34f.ngrok.io/api/"+res.args._issuedto.slice(30,43)
            });	
        }

     
    });
//to get certificate
    $scope.get_cert=function(str){
      console.log(str);
       $scope.certiCalled="called"; 
       check.getCerti(str,function(err,res){
            if(err) throw err;
            console.log(res);
        });
    }
   $scope.toggleLeft = buildToggler('left');
   $scope.toggleRight = buildToggler('right');

   function buildToggler(componentId) {
     return function() {
       $mdSidenav(componentId).toggle();
     };
   }
   //to control dialog

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
  ////
  $scope.callSmart=function(){
      var date=$scope.issuer.date.toString();console.log(date);
      check.add($scope.issuer.to,"20th march",$scope.issuer.body,$scope.issuer.from);
  }
  
});
