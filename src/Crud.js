import { useState, useEffect } from "react";
import firebase from './firebase'

const Crud = () => {
    const [aFirstName, setaFirstName] = useState("");
    const [aLastName, setaLastName] = useState("");
    const [aPhone, setaPhone] = useState("");
    const [userData, setuserData] = useState([]);
    const [uFirstName,setuFirstName] = useState("");
    const [uLastName,setuLastName] = useState("");
    const [uPhone,setuPhone] = useState("");
    const [userId,setuserId] = useState("");

    useEffect(() => {
        const firestore = firebase.database().ref("/UserInfo");
        firestore.on('value', (res) => {
            const data = res.val();
            let userInfo = [];
            for (let id in data) {
                userInfo.push({
                    id: id,
                    FirstName: data[id].FirstName,
                    LastName: data[id].LastName,
                    Phone: data[id].Phone
                });
            }
            setuserData(userInfo);
        })
    },[]);

    const AddUser = () => {

        const firestore = firebase.database().ref("/UserInfo");
        var first = aFirstName.trim();
        var last = aLastName.trim();
        var phone = aPhone.trim();
        if (first.length === 0) {
            alert("FirstName should be filled");
        } else if (last.length === 0) {
            alert("LastName should be filled");
        } else if (phone.length !== 10) {
            alert("Phone Number should be of 10-digits");
        } else {
            let data = {
                FirstName: aFirstName,
                LastName: aLastName,
                Phone: aPhone
            };
            console.log(data);
            firestore.push(data);
            setaFirstName("");
            setaLastName("");
            setaPhone("");
        }
    };

    const updateInfo = (data)=>{
         setuFirstName(data.FirstName);
         setuLastName(data.LastName);
         setuPhone(data.Phone);
         setuserId(data.id);
    }

    const updateUser = ()=>{
        const firestore = firebase.database().ref("/UserInfo").child(userId);
        var first = uFirstName.trim();
        var last = uLastName.trim();
        var phone = uPhone.trim();
        if (first.length === 0) {
            alert("FirstName should be filled");
        } else if (last.length === 0) {
            alert("LastName should be filled");
        } else if (phone.length !== 10) {
            alert("Phone Number should be of 10-digits");
        } else{
        firestore.update({
            FirstName:uFirstName,
            LastName:uLastName,
            Phone:uPhone
        })
        setuFirstName("");
        setuLastName("");
        setuPhone("");
    }
    }

    const deleteUser = (id)=>{
        const firestore = firebase.database().ref("/UserInfo").child(id);
        firestore.remove();
    }

    return (
        <>
            <div className="container">
                <div className="box-1 box">
                    <form action="#">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="Enter first name" value={aFirstName} onChange={(e) => {
                            setaFirstName(e.target.value)
                        }} />
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Enter last name" value={aLastName}
                            onChange={(e) => {
                                setaLastName(e.target.value)
                            }} />
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter Phone number" value={aPhone}
                            onChange={(e) => {
                                setaPhone(e.target.value)
                            }} />
                        <button className="btn btn-1" onClick={() => { AddUser() }}>Add User</button>
                    </form>

                </div>
                <div className="box-2 box">
                    <form action="">
                        <label htmlFor="">First Name</label>
                        <input type="text" placeholder="Enter first name" value={uFirstName}  onChange={(e) => {
                                setuFirstName(e.target.value)
                            }} />
                        <label htmlFor="">Last Name</label>
                        <input type="text" placeholder="Enter last name" value={uLastName}  onChange={(e) => {
                                setuLastName(e.target.value)
                            }}/>
                        <label htmlFor="">Phone Number</label>
                        <input type="text" placeholder="Enter phone number" value={uPhone}  onChange={(e) => {
                                setuPhone(e.target.value)
                            }} />
                        <button className="btn btn-2" onClick={()=>{updateUser()}}>Update User</button>
                    </form>
                </div>
            </div>
            <div className="details container">
                <div className="items">

                    {
                        userData.length == 0 ? (
                            <div className="no-ele">
                                <p className="para">No data present here !!!!!</p>
                            </div>
                        ) : (
                            
                            <div className="heading">
                                <p className="header">FirstName</p>
                                <p className="header">LastName</p>
                                <p className="header">Phone</p>

                                <p className=" btn-head"  >Update</p>
                                <p className="btn-head del">Delete</p>
                            </div>
                        )
                    }

                    {
                        userData.map((data, index) => {
                           return( <div className="all-items">
                                <div className="all-info">
                                    <p className="first-name header ">{data.FirstName}</p>
                                    <p className="last-name header">{data.LastName}</p>
                                    <p className="phone-num header">{data.Phone}</p>
                                    <p className=" update btns" onClick={()=>{updateInfo(data)}} >Update</p>
                                    <p className="delete btns" onClick={()=>{
                                        deleteUser(data.id)
                                    }}>Delete</p>
                                </div>

                            </div>
                           )
                        })
                    }


                 

                </div>
            </div>

        </>
    );
}

export default Crud;