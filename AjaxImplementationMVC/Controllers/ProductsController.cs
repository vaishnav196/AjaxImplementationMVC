using AjaxImplementationMVC.Data;
using AjaxImplementationMVC.Models;
using Microsoft.AspNetCore.Mvc;

namespace AjaxImplementationMVC.Controllers
{
    public class ProductsController : Controller
    {
        private readonly ApplicationDbContext db;
        public ProductsController(ApplicationDbContext db)
        {
            this.db = db;
        }
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult AddProduct(Product p)
        {
            db.products.Add(p);
            db.SaveChanges();
            return new JsonResult("");


        }


        public IActionResult ShowProducts()
        {    var data=db.products.ToList();
           
            return new JsonResult(data);

        }
        public IActionResult SearchProducts(string searchp)
        {
            if (string.IsNullOrEmpty(searchp))
            {
                var data= db.products.ToList();
                return new JsonResult(data);
            }
            else
            {
                var data=db.products.Where(x=>x.Pname.Contains(searchp) || x.Pcat.Contains(searchp) || x.Price.ToString().Contains(searchp)).ToList();   
                return new JsonResult(data);
            }

        }


        public IActionResult DeleteProducts(int prodid)
        {
            var data = db.products.Find(prodid);
            if (data!= null)
            {
                db.products.Remove(data);
                db.SaveChanges();

            }
            return new JsonResult("");

        }



        public IActionResult UpdateProducts(int prodid)
        {
            var data = db.products.Find(prodid);
           
            return new JsonResult(data);

        }

     
        public IActionResult ModifyProducts(Product p)
        {
            db.products.Update(p);
            db.SaveChanges();   
            return new JsonResult("");

        }
    }
}
