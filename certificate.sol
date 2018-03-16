pragma solidity ^0.4.17;
contract certificate{
    address private owner;
     modifier onlyOwner(){
        require(msg.sender==owner);
        _;
     }
    event fetch(address _issuedto,string body,string issued_on,address by);
    function certificate() payable {
        owner=msg.sender;
    }
    struct certify {
        string issued_on;
        string body;
        address by;
    }
    mapping(address=>certify) certi;
    function add(address _to,string on,string body,address by) onlyOwner public {
        certify memory obj;
        obj.issued_on=on;
        obj.body=body;
        obj.by=by;
        certi[_to]=obj;
    }
    function getCerti(address user) public  {
        certify storage obj=certi[user];
       require(bytes(obj.body).length>0);
        fetch(user,obj.body,obj.issued_on,obj.by);
    }
}