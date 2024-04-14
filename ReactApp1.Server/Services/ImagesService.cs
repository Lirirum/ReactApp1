using Microsoft.AspNetCore.Mvc;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using System;


namespace ReactApp1.Server.Services
{

    public interface IImagesService
    {
        public Task<byte[]> GetImage(string imageName);
    }

    public class ImagesService:IImagesService
    {

        private readonly IWebHostEnvironment _environment;

        public ImagesService(IWebHostEnvironment environment)
        {
            _environment = environment;

        }

        public async Task<byte[]> GetImage(string imageName)
        {
            var imagePath = Path.Combine(_environment.WebRootPath, "Images/ProductImages", imageName);
            if (File.Exists(imagePath))
            {
                
                return await File.ReadAllBytesAsync(imagePath);

            }
            else
            {
                return null;
            }
        }

    }
}
