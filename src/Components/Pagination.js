import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../Redux/Actions/Product'

class Pagination extends Component {
    constructor(props){
        super(props)
    }
    
    async getDataProduct(page = 1, sortBy = "created_at", sortMode = "desc", searchName = ""){
        await this.props.dispatch(fetchProduct(page, sortBy, sortMode, searchName))
    }

    __renderPagination(){
        let element = []
        for (let i = 1; i < this.props.product.productList.totalPage+1; i++) {
            element.push(
                <li key={i} className={i == this.props.product.productList.currentPage ? "page-item active" : "page-item"}>
                    <button className={i == this.props.product.productList.currentPage ? "page-link bg-danger no-border" : "page-link"}
                    onClick={() => {
                        this.getDataProduct(
                            i,
                            this.props.product.sortBy,
                            this.props.product.sortMode,
                            this.props.product.searchName
                        )
                    }}>
                        {i}
                    </button>
                </li>
            )
        }
        return element
    }

    render(){
        return(
            <div>
                <nav>
                    <ul className="pagination">
                        <li className={ this.props.product.productList.currentPage === 1 ? "page-item disabled" : "page-item" }>
                            <button className="page-link" onClick={ () => this.getDataProduct(this.props.product.productList.currentPage - 1)}>
                                <i className="fa fa-angle-left"></i>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {this.__renderPagination()}
                        <li className={ this.props.product.productList.currentPage === this.props.product.productList.totalPage ? "page-item disabled" : "page-item" }>
                            <button className="page-link"
                                onClick={ () => this.getDataProduct(this.props.product.productList.currentPage + 1) }>
                                <i className="fa fa-angle-right"></i>
                                <span className="sr-only">Next</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        product: state.Product
    }
}

export default connect(mapStateToProps) (Pagination)