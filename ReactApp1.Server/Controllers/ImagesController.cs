using Microsoft.AspNetCore.Mvc;
using ReactApp1.Server.Services;

namespace ReactApp1.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ImagesController : ControllerBase
    {
        private readonly IImagesService _imagesService;


        public ImagesController(IImagesService imagesService)
        {
            _imagesService = imagesService;
        }

        [HttpGet("{imageName}")]
        public async Task<IActionResult> GetImage(string imageName)
        {
            var result = _imagesService.GetImage(imageName);

            if (result != null)
            {
                var imageBytes =  await _imagesService.GetImage(imageName);
                return File(imageBytes, "image/jpeg");
            }
            else
            {
                return NotFound();
            }

        }
    }
}