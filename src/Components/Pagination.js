import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchProduct } from '../Redux/Actions/Product'

class Pagination extends Component {
    constructor(props){
        super(props)
        this.state = {
            
        }
    }
    
    async getDataProduct(page = 1, sortBy = "created_at", sortMode = "desc", searchName = ""){
        await this.props.dispatch(fetchProduct(page, sortBy, sortMode, searchName))
    }

    __renderPagination(){
        let element = []
        for (let i = 1; i < this.props.data.productList.totalPage+1; i++) {
            element.push(
                <li key={i} className={i == this.props.data.productList.currentPage ? "page-item active" : "page-item"}>
                    <button className={i == this.props.data.productList.currentPage ? "page-link bg-danger no-border" : "page-link"}
                    onClick={() => {
                        this.getDataProduct(
                            i,
                            this.props.data.sortBy,
                            this.props.data.sortMode,
                            this.props.data.searchName
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
                        <li className={ this.props.data.productList.currentPage === 1 ? "page-item disabled" : "page-item" }>
                            <button className="page-link" onClick={ () => this.getDataProduct(this.props.data.productList.currentPage - 1)}>
                                <i className="fa fa-angle-left"></i>
                                <span className="sr-only">Previous</span>
                            </button>
                        </li>
                        {this.__renderPagination()}
                        <li className={ this.props.data.productList.currentPage === this.props.data.productList.totalPage ? "page-item disabled" : "page-item" }>
                            <button className="page-link"
                                onClick={ () => this.getDataProduct(this.props.data.productList.currentPage + 1) }>
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
        data: state.productList
    }
}

export default connect(mapStateToProps) (Pagination)