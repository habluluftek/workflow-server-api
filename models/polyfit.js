// function _prepare(_mat) {
// _mat=[[]].concat(_mat)
// for(i=0;i<_mat.length;++i)
//     _mat[i]=[0].concat(_mat[i])
// return _mat
// }

// function linear(_mat){
// _mat=_prepare(_mat)
// return _solve(_mat)
// }

module.exports = {
    polyFit: (e, b) => {
        var a = new Array()
        var n = 1 + b,
            e = [
                [0, 0]
            ].concat(e),
            ns = e.length - 1
        for (i = 0; i <= n + 1; i++) {
            a[i] = new Array();
            for (j = 0; j <= n + 1; ++j)
                a[i][j] = 0
        }
        for (m = 1; m <= n; m++)
            for (i = 1; i <= m; i++) {
                j = m - i + 1;
                for (ii = 1; ii <= ns; ii++)
                    a[i][j] = a[i][j] + Math.pow(e[ii][0], m - 1)
            }
        for (i = 1; i <= n; ++i)
            for (ii = 1; ii <= ns; ++ii)
                a[i][n + 1] = a[i][n + 1] + e[ii][1] * Math.pow(e[ii][0], i - 1)
        for (m = n + 2; m <= 2 * n; ++m)
            for (i = m - n; i <= n; ++i) {
                j = m - i
                for (ii = 1; ii <= ns; ++ii)
                    a[i][j] = a[i][j] + Math.pow(e[ii][0], m - 2) // coefficients of system
            }
        a.length = a.length - 1


        // _solve(_mat) {
        var c = new Array(),
            d = new Array()
        var n = a.length - 1

        for (i = 0; i <= n + 1; i++) {
            d[i] = new Array();
            c[i] = 0
            for (j = 0; j <= n + 1; ++j)
                d[i][j] = 0
        }

        // mission impossible
        // calculate all the determinants of the system
        for (m = 2; m <= n; ++m) {
            for (i = m; i <= n; ++i)
                for (j = m - 1; j <= n + 1; ++j)
                    d[i][j] = [a[i][j] * a[m - 1][m - 1], a[i][m - 1]]
            for (i = m; i <= n; ++i)
                for (j = m - 1; j <= n + 1; ++j) {
                    a[i][j] = d[i][j][0] - d[i][j][1] * a[m - 1][j]
                    if (Math.abs(a[i][j]) < 1e-25) a[i][j] = 0 // i have to add this line
                }
        }
        // now the coefficients of equation (not exactly)

        for (i = n; i >= 1; --i) {
            c[i - 1] = a[i][n + 1]
            if (i != n)
                for (j = n; j >= i + 1; --j)
                    c[i - 1] = c[i - 1] - a[i][j] * c[j - 1]
            if (a[i][i] != 0)
                c[i - 1] = c[i - 1] / a[i][i]
            else
                c[i - 1] = 0
            if (Math.abs(c[i - 1]) < 1e-25)
                c[i - 1] = 0
        }
        c.length = n
        return c
        // }

        // return _solve(a)
    }
}

// function _solve(_mat){
// var c=new Array(),d=new Array()
// var n=_mat.length-1

// for(i=0;i<=n+1;i++) {
//     d[i]=new Array();
//     c[i]=0
//     for(j=0;j<=n+1;++j)
//         d[i][j]=0
// }

// // mission impossible
// // calculate all the determinants of the system
// for(m=2; m<=n ; ++m) {
//     for(i=m;i<=n;++i)
//         for(j = m-1;j<=n+1;++j)
//             d[i][j] = [_mat[i][j] * _mat[m-1][m-1] , _mat[i][m-1]]
//         for(i=m;i<=n;++i)
//             for(j=m-1;j<=n+1;++j) {
//                 _mat[i][j] = d[i][j][0]-d[i][j][1]*_mat[m-1][j] 
//                 if(Math.abs(_mat[i][j])<1e-25) _mat[i][j]=0  // i have to add this line
//             }
// }
// // now the coefficients of equation (not exactly)

// for(i=n;i>=1;--i) {
//     c[i-1] = _mat[i][n+1]
//     if (i!=n)
//     for(j=n; j>=i+1;--j)
//         c[i-1] = c[i-1] -_mat[i][j] * c[j-1]
//     if(_mat[i][i]!=0)
//         c[i-1]=c[i-1] / _mat[i][i]
//     else
//         c[i-1]=0
//     if(Math.abs(c[i-1])<1e-25)
//         c[i-1]=0
// }
// c.length=n
// return c
// }

// function fitpoly(e,b){
// var a=new Array()
// var n = 1+b,e=[[0,0]].concat(e),ns=e.length-1
// for(i=0;i<=n+1;i++) {
//     a[i]=new Array();
//     for(j=0;j<=n+1;++j)
//         a[i][j]=0
// }
// for(m=1;m <= n;m++)
//     for(i=1;i<= m;i++) {
//         j = m - i + 1; 
//         for(ii=1;ii <= ns;ii++)
//             a[i][j] = a[i][j] + Math.pow(e[ii][0], m-1)
//     }  
// for(i=1;i<= n;++i)
//     for(ii=1;ii<=ns;++ii)
//         a[i][n+1] = a[i][n+1] +e[ii][1]*Math.pow(e[ii][0],i-1) 
// for(m = n+2 ; m <= 2*n ; ++m)
//     for(i = m-n; i<= n;++i) {
//         j= m -i 
//         for(ii=1; ii<=ns;++ii)
//             a[i][j] = a[i][j] + Math.pow(e[ii][0],m-2) // coefficients of system
//     }
// a.length=a.length-1  
// return _solve(a)
// }




// //and then
// poly_degree = 10
// points= [[2,2],[2,4],[4,6],[6,4],[8,2]]
// // coefficients of polynome 
// console.log(fitpoly(points, poly_degree))

// // or solve a linear system. Here with six variables
// solution = linear([[1,2,3,-2,-3,-26,52],[3,2,5,-2,4,30,-60],[6,1,-4,-1,5,94,-188],[-1,2,4,3,4,30,-60],[-1,4,2,-1,2,26,-52],[3,-3,11,-7,-2,-1,-95]])
// console.log(solution)