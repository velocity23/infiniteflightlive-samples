using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IfLiveCsharp.InfiniteFlightLiveClient
{
    public class Group
    {
        public Group(string id, string name)
        {
            Id = new Guid(id);
            Name = name;
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}
