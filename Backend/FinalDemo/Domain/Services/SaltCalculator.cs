using Domain.Models.Entity;
using SWP391.KCSAH.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Services
{
    public class SaltCalculator
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly KoiCareSystemAtHomeContext _context;
        public SaltCalculator(UnitOfWork unitOfWork, KoiCareSystemAtHomeContext context)
        {
            _unitOfWork = unitOfWork;
            _context = context;
        }

        public async Task<int> GetVolumesOfPondById(int id)
        {
            if (id <= 0)
            {
                throw new ArgumentException("Pond ID must be greater than 0", nameof(id));
            }
            var result = await _unitOfWork.PondRepository.GetByIdAsync1(id);
            if (result == null)
            {
                return 0;
            }
            return result.Volume;
        }

        public async Task<int> AmountOfSaltChangeHigherConcentration(int id, float desired,float current)
        {
            ValidateConcentrations(desired, current);
            int volume = await GetVolumesOfPondById(id);
            if (volume == 0)
            {
                return 0;
            }
            int amountOfSalt = (int)(volume * (desired - current) / 100);
            return amountOfSalt;
        }

        public async Task<float> AmountOfSaltPerWaterChangeHigherConcentration(int id, float desired, int percentWaterChange)
        {
            ValidateParameters(desired, percentWaterChange);
            int volume = await GetVolumesOfPondById(id);
            if (volume == 0)
            {
                return 0;
            }
            int waterChange = CalculateWaterChangeVolume(volume, percentWaterChange);

            float amountOfSaltRefill = (waterChange * desired / 100);
            return amountOfSaltRefill;
        }

        public async Task<int> NumberOfWaterChangesChangeLowerConcentration(int id, float desired, float current,int percentWaterChange)
        {
            ValidateParameters(desired, current, percentWaterChange);
            int volume = await GetVolumesOfPondById(id);
            if (volume == 0)
            {
                return 0;
            }
            int waterChange = CalculateWaterChangeVolume(volume, percentWaterChange);
            if (waterChange == 0 || waterChange > volume)
            {
                return 0;
            }
            double numerator = CalculateNumerator(desired,current);
            double denominator = CalculateDenominator(volume,waterChange);
            if (denominator ==0) //double.Epsilon: số dương bé nhất có thể có mà >0
            {
                return 0;
            }
            return (int)Math.Ceiling(numerator / denominator); //làm tròn lên để đạt đc nồng độ mong muốn
        }

        private double CalculateNumerator(float desired, float current)
        {
            return Math.Log10(desired / current);
        }

        private double CalculateDenominator(int volume, int waterChange)
        {
            float input = ((float)(volume - waterChange)) / volume;
            return Math.Log10(input);
        }

        private int CalculateWaterChangeVolume(int totalVolume, int percentWaterChange)
        {
            return (totalVolume * percentWaterChange) / 100;
        }

        private void ValidateConcentrations(float desired, float current)
        {
            if (desired < 0 || desired >2)
            {
                throw new ArgumentException("Desired concentration must be non-negative and lower than 2", nameof(desired));
            }
            if (current < 0 || current > 2)
            {
                throw new ArgumentException("Current concentration must be non-negative and lower than 2", nameof(current));
            }
        }

        private void ValidateParameters(float desired, int percentWaterChange)
        {
            if (desired < 0 || desired > 2)
            {
                throw new ArgumentException("Desired concentration must be non-negative and lower than 2", nameof(desired));
            }
            if (percentWaterChange < 0 || percentWaterChange > 100)
            {
                throw new ArgumentException("Percent water change must be between 0 and 100", nameof(percentWaterChange));
            }
        }

        private void ValidateParameters(float desired, float current, int percentWaterChange)
        {
            ValidateConcentrations(desired, current);
            if (percentWaterChange < 0 || percentWaterChange > 100)
            {
                throw new ArgumentException("Percent water change must be between 0 and 100", nameof(percentWaterChange));
            }
        }

    }
}
