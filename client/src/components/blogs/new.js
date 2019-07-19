import React, { useState } from "react";
import { Redirect } from "react-router-dom";


function New (){
    const [inputs, setInputs] = useState({});
    const [redirect, setRediract] = useState(false);

    function handleSubmit(event){ 

    } 

    function handleInputChange (event) {

    }

    if (redirect) return <Redirect to="/blogs" />;

    return (
        <div className="container">
            <header>
                <h1>New Blog Post</h1>
            </header>

            <div>
                <form onSubmit={handleSubmit}>

                    <div className="form-group">
                    <lable>Title</lable>
                    <input className="form-control" name="title" required="required" onchange={handleInputChange} />
                    </div>

                    <div className="form-group">
                    <lable>Content</lable>
                    <input className="form-control" name="contect" required="required" onchange={handleInputChange} />
                    </div>

                    <div className="form-group">
                    <lable>Status</lable>
                    <select className="form-control" name="status" required="required" onchange={handleInputChange}>
                        <option value="DRAFT">draft</option>
                        <option value="PUBLISHED">PUBLISHED</option>
                    </select>
                    </div>

                    <div className="form-control">
                        <button className="btn btn-dark" type="reset">Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default New;