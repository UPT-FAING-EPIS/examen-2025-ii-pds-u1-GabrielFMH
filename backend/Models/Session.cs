using System.ComponentModel.DataAnnotations;

namespace AttendanceApi.Models
{
    public class Session
    {
        public int Id { get; set; }

        [Required]
        public int CourseId { get; set; }

        [Required]
        public DateTime Date { get; set; }

        [StringLength(200)]
        public string Topic { get; set; } = string.Empty;

        // Navigation properties
        public Course Course { get; set; } = null!;
        public ICollection<Attendance> Attendances { get; set; } = new List<Attendance>();
    }
}