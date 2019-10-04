import React, { Component } from 'react'

class CardProduct extends Component {
    constructor(){
        super()
        this.state = {
            
        }
    }

    render(){
        return(
            <div>
                <div className="row">
                    {
                        this.props.products.map((val, key) => {
                            return(
                                <div className="col-md-4 mt-5">
                                    <div className="card custom-shadow" style={{marginTop: "76px"}}>
                                        <img src={"http://localhost:1337/images/" + val.image} className="img-product" />
                                        <div className="card-body" style={{ paddingTop: '115px' }}>
                                            <h5 className="card-title">{ val.name }</h5>
                                            <h5><span className="badge badge-danger">Rp. { val.price }</span></h5>
                                            <button className="btn btn-success btn-sm btn-block mt-3 disabled">
                                                <i class="fa fa-check"></i>
                                                Added to cart
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        )
    }
}

export default CardProduct
