var g_publications_by_year = {};
var g_projects_by_year     = {};
var g_items_by_date        = [];
var g_items_by_date_sorted = true;

function GetIconFromLink(link) {
    var extension = link.split(".").pop();

    if      (extension === "pdf")                                                                                             { return "res/Icons/icon-pdf.png";     }
    else if (extension === "bib" || extension === "tex")                                                                      { return "res/Icons/icon-tex.png";     }
    else if (extension === "html")                                                                                            { return "res/Icons/icon-html.png";    }
    else if (extension === "txt")                                                                                             { return "res/Icons/icon-txt.png";     }
    else if (extension === "zip" || extension === "rar")                                                                      { return "res/Icons/icon-zip.png";     }
    else if (extension === "mov" || extension === "mp4" || extension === "avi" || extension === "mkv" || extension === "wmv") { return "res/Icons/icon-video.png";   }
    else if (extension === "ppt" || extension === "pptx")                                                                     { return "res/Icons/icon-ppt.png";     }
    else                                                                                                                      { return "res/Icons/icon-unknown.png"; }
}

var Download = function (description, link, icon, extension, size) {
    this.description = description;
    this.link        = link;
    this.icon        = (icon) ? icon : GetIconFromLink(link);
    this.extension   = extension;
    this.size        = size;
};

var Publication = function (title, authors, citation, thumbnail, month, year, projectpage, downloads) {
    this.title       = title;
    this.authors     = authors;
    this.citation    = citation;
    this.thumbnail   = thumbnail;
    this.month       = month;
    this.year        = year;
    this.projectpage = projectpage;
    this.downloads   = downloads;
};

var Project = function (title, authors, description, thumbnail, month, year, projectpage, downloads) {
    this.title       = title;
    this.authors     = authors;
    this.description = description;
    this.thumbnail   = thumbnail;
    this.month       = month;
    this.year        = year;
    this.projectpage = projectpage;
    this.downloads   = downloads;
};

function AddItem(item, year) {
    g_items_by_date.push(item);
    g_items_by_date_sorted = false;
}

function AddPublication(publication, year) {
    if (!g_publications_by_year.hasOwnProperty(year)) {
        g_publications_by_year[year] = [];
    }

    g_publications_by_year[year].push(publication);
	
    AddItem(publication, year);
}

function AddProject(project, year) {
    if (!g_projects_by_year.hasOwnProperty(year)) {
        g_projects_by_year[year] = [];
    }

    g_projects_by_year[year].push(project);

    AddItem(project, year);
}

function CreatePublication(title, authors, citation, thumbnail, month, year, projectpage, downloads) {
    var publication = new Publication(title, authors, citation, thumbnail, month, year, projectpage, downloads);
    AddPublication(publication, year);
}

function CreateProject(title, authors, description, thumbnail, month, year, projectpage, downloads) {
    var project = new Project(title, authors, description, thumbnail, month, year, projectpage, downloads);
    AddProject(project, year);
}

function GetDataOfYear(map, year) {
    if (map.hasOwnProperty(year)) {
        var data = map[year];

        data.sort(function (lhs, rhs) {
            return rhs.month - lhs.month;
        });

        return data;
    }
    else {
        return [];
    }
}

function GetPublicationsOfYear(year) {
    return GetDataOfYear(g_publications_by_year, year);
}

function GetProjectsOfYear(year) {
    return GetDataOfYear(g_projects_by_year, year);
}

function GetDataYears(map) {
	var years = Object.keys(map);
	years.sort();
	return years;
}

function GetPublicationYears() {
	return GetDataYears(g_publications_by_year);
}

function GetProjectYears() {
	return GetDataYears(g_projects_by_year);
}

function SortItems(list) {
    list.sort(function (lhs, rhs) {
        if      (lhs.year  < rhs.year)  { return  1; }
        else if (lhs.year  > rhs.year)  { return -1; }
        else if (lhs.month < rhs.month) { return  1; }
        else if (lhs.month > rhs.month) { return -1; }
        else return rhs.title.localeCompare(lhs.title);
    });
}

function GetRecentItems(count) {
    if (g_items_by_date_sorted === false) {
        SortItems(g_items_by_date, count);
        g_items_by_date_sorted = true;
    }
	
	var recent = [];
    for (var i = 0; i < Math.min(count, g_items_by_date.length); ++i) {
        recent.push(g_items_by_date[i]);
    }
	
    return recent;
}

//-----------------------------------------------------------------------------
// Publications
//-----------------------------------------------------------------------------
CreatePublication("On the use of Local Ray Termination for Efficiently Constructing Qualitative BSPs, BIHs and (S)BVHs",
    ["Matthias Moulin", "Philip Dutr&eacute;"],
    "To Appear in The Visual Computer ?, ?, July 2018",
    "res/Publications/Moulin2018-1/Thumbnail.png", 7, 2018,
    "res/Publications/Moulin2018-1/Publication.html",
    [new Download("Preprint",     "res/Publications/Moulin2018-1/Preprint.pdf",      undefined, "PDF",  "(Coming Soon)"),
     new Download("Citation",     "res/Publications/Moulin2018-1/Citation.bib",      undefined, "BIB",  "(Coming Soon)"),
     new Download("Abstract",     "res/Publications/Moulin2018-1/Abstract.txt",      undefined, "TXT",  "1.7 kB"),
	 new Download("Supplementary Material (1/3)", "res/Publications/Moulin2018-1/Supplementary1.pdf",  undefined, "PDF",  "(Coming Soon)"),
	 new Download("Supplementary Material (2/3)", "res/Publications/Moulin2018-1/Supplementary2.pdf",  undefined, "PDF",  "(Coming Soon)"),
     new Download("Supplementary Material (3/3)", "res/Publications/Moulin2018-1/Supplementary3.zip",  undefined, "ZIP",  "(Coming Soon)"),
     new Download("DOI",          "https://matt77hias.github.io/private",            "res/Icons/icon-html.png"),
	 new Download("Lirias",       "https://matt77hias.github.io/private",            "res/Icons/icon-html.png")
    ]
	);

CreatePublication("Hybrid Kd-trees for Photon Mapping and Accelerating Ray Tracing",
    ["Matthias Moulin"],
    "Master's thesis, Department of Computer Science, KU Leuven, Belgium, June 2015",
    "res/Publications/Moulin2015-2/Thumbnail.png", 6, 2015,
    "res/Publications/Moulin2015-2/Publication.html",
    [new Download("Dissertation", "res/Publications/Moulin2015-2/Dissertation.pdf",  undefined, "PDF", "47.5 MB"),
	 new Download("Citation",     "res/Publications/Moulin2015-2/Citation.bib",      undefined, "BIB",  "0.3 kB"),
     new Download("Abstract",     "res/Publications/Moulin2015-2/Abstract.txt",      undefined, "TXT",  "4.0 kB"),
     new Download("Presentation", "res/Publications/Moulin2015-2/Presentation.pdf",  undefined, "PDF",  "1.4 MB"),
     new Download("Poster",       "res/Publications/Moulin2015-2/Poster.pdf",        undefined, "PDF",  "1.3 MB")
    ]
	);

CreatePublication("Efficient Visibility Heuristics for kd-trees Using the RTSAH",
    ["Matthias Moulin", "Niels Billen", "Philip Dutr&eacute;"],
    "Eurographics Symposium on Rendering - Experimental Ideas & Implementations, June 2015",
    "res/Publications/Moulin2015-1/Thumbnail.png", 6, 2015,
    "res/Publications/Moulin2015-1/Publication.html",
    [new Download("Preprint",     "res/Publications/Moulin2015-1/Preprint.pdf",      undefined, "PDF", "10.5 MB"),
     new Download("Citation",     "res/Publications/Moulin2015-1/Citation.bib",      undefined, "BIB",  "0.6 kB"),
     new Download("Abstract",     "res/Publications/Moulin2015-1/Abstract.txt",      undefined, "TXT",  "0.9 kB"),
     new Download("Presentation", "res/Publications/Moulin2015-1/Presentation.pdf",  undefined, "PDF",  "6.7 MB"),
     new Download("Poster",       "res/Publications/Moulin2015-1/Poster.pdf",        undefined, "PDF",  "1.3 MB"),
     new Download("DOI",          "https://dx.doi.org/10.2312/sre.20151164",            "res/Icons/icon-html.png"),
	 new Download("Lirias",       "https://lirias.kuleuven.be/handle/123456789/501514", "res/Icons/icon-html.png")
    ]
	);
	
//-----------------------------------------------------------------------------
// 2nd Semester - 2nd PhD of Science in Engineering (2016-2017)
//-----------------------------------------------------------------------------
CreateProject("MAGE",
    ["Matthias Moulin"],
    "January 2017",
    "res/Projects/MAGE/Thumbnail.png", 1, 2017,
    "https://github.com/matt77hias/MAGE",
	[new Download("Assets",        "https://github.com/matt77hias/MAGE-Assets",     "res/Icons/icon-html.png"),
	 new Download("Code",          "https://github.com/matt77hias/MAGE",            "res/Icons/icon-html.png"),
	 new Download("Documentation", "https://github.com/matt77hias/MAGE-Doc",        "res/Icons/icon-html.png"),
	 new Download("Font Utility",  "https://github.com/matt77hias/MAGE-SpriteFont", "res/Icons/icon-html.png"),
	 new Download("Meta",          "https://github.com/matt77hias/MAGE-Meta",       "res/Icons/icon-html.png")
	]
	);

//-----------------------------------------------------------------------------
// 1st Semester - 2nd PhD of Science in Engineering (2016-2017)
//-----------------------------------------------------------------------------
CreateProject("Monte Carlo Integration Techniques",
    ["Matthias Moulin"],
    "October 2016",
    "res/Projects/MC/Thumbnail.png", 10, 2016,
    "https://github.com/matt77hias/MCExperiments",
	[new Download("Supplementary Notes", "https://github.com/matt77hias/MC/blob/master/MC.pdf", "res/Icons/icon-pdf.png"),
	 new Download("Supplementary Notes", "https://github.com/matt77hias/MC",                    "res/Icons/icon-html.png")
	]
	);

CreateProject("fibpy",
    ["Matthias Moulin"],
    "October 2016",
    "res/Projects/fibpy/Thumbnail.png", 10, 2016,
    "https://github.com/matt77hias/fibpy",
	[]
	);

CreateProject("pippy",
    ["Matthias Moulin"],
    "October 2016",
    "res/Projects/pippy/Thumbnail.png", 10, 2016,
    "https://github.com/matt77hias/pippy",
	[]
	);
	
//-----------------------------------------------------------------------------
// 2nd Semester - 1st PhD of Science in Engineering (2015-2016)
//-----------------------------------------------------------------------------
CreateProject("Rosetta smallpt",
    ["Matthias Moulin"],
    "September 2016",
    "res/Projects/smallpt/Thumbnail.png", 9, 2016,
    "https://github.com/matt77hias/smallpt",
	[new Download("C",                  "https://github.com/matt77hias/c-smallpt",      "res/Icons/icon-html.png"),
	 new Download("C++",                "https://github.com/matt77hias/cpp-smallpt",    "res/Icons/icon-html.png"),
	 new Download("C#",                 "https://github.com/matt77hias/cs-smallpt",     "res/Icons/icon-html.png"),
	 new Download("CoffeeScript",       "https://github.com/matt77hias/coffee-smallpt", "res/Icons/icon-html.png"),
	 new Download("CUDA",               "https://github.com/matt77hias/cu-smallpt",     "res/Icons/icon-html.png"),
	 new Download("Erlang",             "https://github.com/matt77hias/erl-smallpt",    "res/Icons/icon-html.png"),
	 new Download("Haskell",            "https://github.com/matt77hias/hs-smallpt",     "res/Icons/icon-html.png"),
	 new Download("Java",               "https://github.com/matt77hias/java-smallpt",   "res/Icons/icon-html.png"),
	 new Download("JavaScript",         "https://github.com/matt77hias/js-smallpt",     "res/Icons/icon-html.png"),
	 new Download("J#",                 "https://github.com/matt77hias/jsl-smallpt",    "res/Icons/icon-html.png"),
	 new Download("Prolog",             "https://github.com/matt77hias/pl-smallpt",     "res/Icons/icon-html.png"),
	 new Download("Python 2.7",         "https://github.com/matt77hias/py-smallpt",     "res/Icons/icon-html.png"),
	 new Download("Python 3.5",         "https://github.com/matt77hias/py-smallpt",     "res/Icons/icon-html.png"),
	 new Download("Python 2.7 + NumPy", "https://github.com/matt77hias/numpy-smallpt",  "res/Icons/icon-html.png"),
	 new Download("Python 3.5 + NumPy", "https://github.com/matt77hias/numpy-smallpt",  "res/Icons/icon-html.png"),
	 new Download("Racket",             "https://github.com/matt77hias/rkt-smallpt",    "res/Icons/icon-html.png"),
	 new Download("TypeScript",         "https://github.com/matt77hias/ts-smallpt",     "res/Icons/icon-html.png")]
	);
	
//-----------------------------------------------------------------------------
// 1st Semester - 1st PhD of Science in Engineering (2015-2016)
//-----------------------------------------------------------------------------
CreateProject("pbrtpy",
    ["Matthias Moulin"],
    "December 2015",
    "res/Projects/pbrtpy/Thumbnail.png", 12, 2015,
    "https://github.com/matt77hias/pbrtpy",
	[]
	);

CreateProject("FalseColor Visualization",
    ["Matthias Moulin"],
    "November 2015",
    "res/Projects/FalseColor/Thumbnail.png", 11, 2015,
    "https://github.com/matt77hias/FalseColor",
	[]
	);
	
CreateProject("Personal Webpage",
    ["Matthias Moulin", "Niels Billen"],
    "November 2015",
    "res/Projects/PersonalWebpage/Thumbnail.png", 11, 2015,
    "https://github.com/matt77hias/matt77hias.github.io",
	[new Download("Play", "matt77hias.github.io", "res/Icons/icon-html.png")]
	);
	
CreateProject("Clipping",
    ["Matthias Moulin"],
    "November 2015",
    "res/Projects/Clipping/Thumbnail.png", 11, 2015,
    "https://github.com/matt77hias/Clipping",
	[]
	);

//-----------------------------------------------------------------------------
// 2nd Semester - 2nd Master of Science in Engineering (2014-2015)
//-----------------------------------------------------------------------------
CreateProject("Hybrid Survivor",
    ["Matthias Moulin", "Milan Samyn", "Samuel Lannoy"],
    "Course: Capita Selecta Computer Science: Human Machine Communication: Game Design (B-KUL-H05N2A), June 2015",
    "res/Projects/HybridSurvivor/Thumbnail.png", 6, 2015,
    "https://github.com/matt77hias/HybridSurvivor",
	[new Download("Oculus Rift", "https://github.com/matt77hias/HybridSurvivor-OculusRift", "res/Icons/icon-html.png"),
	 new Download("HTC Vive",    "https://github.com/matt77hias/HybridSurvivor-PC",         "res/Icons/icon-html.png"),
	 new Download("PC & Web",    "https://github.com/matt77hias/HybridSurvivor-HTCVive",    "res/Icons/icon-html.png")
	]
	);

CreateProject("Stochastic Experiments",
    ["Matthias Moulin"],
    "Course: Deterministic and Stochastic Integration Techniques (B-KUL-H03G3B), May 2015",
    "res/Projects/StochasticExperiments/Thumbnail.png", 5, 2015,
    "https://github.com/matt77hias/StochasticExperiments",
	[]
	);

CreateProject("Quadrature Experiments",
    ["Matthias Moulin"],
    "Course: Deterministic and Stochastic Integration Techniques (B-KUL-H03G3B), May 2015",
    "res/Projects/QuadratureExperiments/Thumbnail.png", 5, 2015,
    "https://github.com/matt77hias/QuadratureExperiments",
	[]
	);

//-----------------------------------------------------------------------------
// 1st Semester - 2nd Master of Science in Engineering (2014-2015)
//-----------------------------------------------------------------------------
CreateProject("Kajiya",
    ["Matthias Moulin", "Mattias Buelens"],
    "Course: Requirements Analysis for Complex Software Systems (B-KUL-G0K32A), December 2014",
    "res/Projects/Kajiya/Thumbnail.png", 12, 2014,
    "https://matt77hias.github.io/private",
	[]
	);

CreateProject("Fingerprint Compression",
    ["Matthias Moulin"],
    "Course: Wavelets (B-KUL-H03F7A), December 2014",
    "res/Projects/FingerprintCompression/Thumbnail.png", 12, 2014,
    "https://github.com/matt77hias/FingerprintCompression",
	[]
	);

CreateProject("Tron",
    ["Matthias Moulin"],
    "Course: Comparative Programming Languages (B-KUL-H04L5A), December 2014",
    "res/Projects/Tron/Thumbnail.png", 12, 2014,
    "https://github.com/matt77hias/Tron",
	[new Download("Play", "http://matt77hias.github.io/Tron/", "res/Icons/icon-html.png")]
	);

CreateProject("2048",
    ["Matthias Moulin"],
    "Course: Comparative Programming Languages (B-KUL-H04L5A), December 2014",
    "res/Projects/2048/Thumbnail.png", 12, 2014,
    "https://github.com/matt77hias/2048",
	[]
	);

//-----------------------------------------------------------------------------
// 2nd Semester - 1st Master of Science in Engineering (2013-2014)
//-----------------------------------------------------------------------------
CreateProject("Incisor Segmentation",
    ["Matthias Moulin", "Milan Samyn"],
    "Course: Computer Vision (B-KUL-H02A5A), June 2014",
    "res/Projects/IncisorSegmentation/Thumbnail.png", 6, 2014,
    "https://matt77hias.github.io/private",
	[]
	);
	
CreateProject("FrigoShare",
    ["Herbert Beraldo", "Matthias Moulin", "Ruben Pieters"],
    "Course: User Interfaces (B-KUL-H04I2A), June 2014",
    "res/Projects/FrigoShare/Thumbnail.png", 6, 2014,
    "https://anarchikul.wordpress.com/",
	[new Download("Play", "https://play.google.com/store/apps/details?id=com.frigoshare", "res/Icons/icon-html.png"), 
	 new Download("Code", "https://github.com/matt77hias/FrigoShare", "res/Icons/icon-html.png")]
	);

CreateProject("ReMeS: Remote Measurement, Monitoring and Control System",
    ["Matthias Moulin", "Ruben Pieters"],
    "Course: Software Architecture (B-KUL-H07Z9A), June 2014",
    "res/No Image.jpg", 6, 2014,
    "https://matt77hias.github.io/private",
	[]
	);
	
CreateProject("Sampling Experiments",
    ["Matthias Moulin"],
    "Course: Computer Graphics II (B-KUL-G0B36A), April 2014",
    "res/Projects/SamplingExperiments/Thumbnail.png", 4, 2014,
    "https://matt77hias.github.io/private",
	[]
	);
	
CreateProject("Face Recognition",
    ["Matthias Moulin"],
    "Course: Computer Vision (B-KUL-H02A5A), March 2014",
    "res/Projects/FaceRecognition/Thumbnail.png", 3, 2014,
    "https://github.com/matt77hias/FaceRecognition",
	[]
	);
	
CreateProject("Segmentation",
    ["Matthias Moulin"],
    "Course: Computer Vision (B-KUL-H02A5A), March 2014",
    "res/Projects/Segmentation/Thumbnail.png", 3, 2014,
    "https://github.com/matt77hias/Segmentation",
	[]
	);
	
CreateProject("Smoothing",
    ["Matthias Moulin"],
    "Course: Computer Vision (B-KUL-H02A5A), March 2014",
    "res/Projects/Smoothing/Thumbnail.png", 3, 2014,
    "https://github.com/matt77hias/Smoothing",
	[]
	);

//-----------------------------------------------------------------------------
// 1st Semester - 1st Master of Science in Engineering (2013-2014)
//-----------------------------------------------------------------------------
CreateProject("Pacman",
    ["Matthias Moulin", "Ruben Pieters"],
    "Course: Modelling of Complex Systems (B-KUL-G0Q66B), December 2013",
    "res/Projects/Pacman/Thumbnail.png", 12, 2013,
    "https://matt77hias.github.io/private",
	[]
	);

CreateProject("Lilyhammer Rendering Engine",
    ["Matthias Moulin"],
    "Course: Computer Graphics I (B-KUL-G0Q66B), December 2013",
    "res/Projects/LilyhammerRenderingEngine/Thumbnail.png", 12, 2013,
    "res/Projects/LilyhammerRenderingEngine/Project.html",
	[]
	);

CreateProject("JUnit Test Deamon",
    ["Matthias Moulin", "Mattias Buelens", "Ruben Pieters", "Vital D'haveloose"],
    "Course: Design of Software Systems (B-KUL-H04J9B), December 2013",
    "res/Projects/JUnitTestDeamon/Thumbnail.png", 12, 2013,
    "https://github.com/matt77hias/junit",
	[]
	);

CreateProject("Car Rental Agency",
    ["Matthias Moulin", "Ruben Pieters"],
    "Course: Distributed Systems (B-KUL-H04I4A), December 2013",
    "res/No Image.jpg", 12, 2013,
    "https://github.com/matt77hias/CarRental-Meta",
	[new Download("Java RMI 1", "https://github.com/matt77hias/JavaRMI1", "res/Icons/icon-html.png"),
	 new Download("Java RMI 2", "https://github.com/matt77hias/JavaRMI2", "res/Icons/icon-html.png"),
	 new Download("Java EE",    "https://github.com/matt77hias/JavaEE",   "res/Icons/icon-html.png"),
	 new Download("Java GAE",   "https://github.com/matt77hias/JavaGAE",  "res/Icons/icon-html.png")
	]
	);
	
CreateProject("Synchronization Experiments",
    ["Matthias Moulin"],
    "Course: Operating Systems (B-KUL-H04G1B), November 2013",
    "res/Projects/SynchronizationExperiments/Thumbnail.png", 11, 2013,
    "https://github.com/matt77hias/JavaSyncExperiments",
	[]
	);

//-----------------------------------------------------------------------------
// Holiday (2013)
//-----------------------------------------------------------------------------
CreateProject("Snake",
    ["Matthias Moulin"],
    "August 2013",
    "res/Projects/Snake/Thumbnail.png", 8, 2013,
    "https://github.com/matt77hias/Snake",
	[]
	);
	
//-----------------------------------------------------------------------------
// 1st + 2nd Semester - 3th Bachelor of Science in Engineering (2012-2013)
//-----------------------------------------------------------------------------
CreateProject("MazeStormer",
    ["Dennis Frett", "Matthias Moulin", "Mattias Buelens", "Stijn Hoskens", "Vital D'haveloose", "Stijn Hoskens"],
    "Course: Problem Solving and Design: Computer Science (B-KUL-H01Q3C), June 2013",
    "res/Projects/MazeStormer/Thumbnail.png", 6, 2013,
    "https://github.com/matt77hias/MazeStormer",
	[new Download("Demo 1", "https://www.youtube.com/watch?v=PkklxX5FeSE", "res/Icons/icon-html.png"), 
	 new Download("Demo 2", "https://www.youtube.com/watch?v=WiFAeo-Ifsk", "res/Icons/icon-html.png")]
	);
	
//-----------------------------------------------------------------------------
// 2nd Semester - 3th Bachelor of Science in Engineering (2012-2013)
//-----------------------------------------------------------------------------
CreateProject("Network Simulation, Part 2",
    ["Matthias Moulin"],
    "Course: Computer Networks (B-KUL-G0Q43A), April 2013",
    "res/Projects/NetworkSimulation2/Thumbnail.png", 4, 2013,
    "https://github.com/matt77hias/NS2",
	[]
	);
	
CreateProject("Network Simulation, Part 1",
    ["Matthias Moulin"],
    "Course: Computer Networks (B-KUL-G0Q43A), April 2013",
    "res/Projects/NetworkSimulation1/Thumbnail.png", 4, 2013,
    "https://github.com/matt77hias/NS1",
	[]
	);
	
CreateProject("Socket Experiments",
    ["Matthias Moulin", "Ruben Pieters"],
    "Course: Computer Networks (B-KUL-G0Q43A), April 2013",
    "res/Projects/SocketExperiments/Thumbnail.png", 4, 2013,
    "https://github.com/matt77hias/JavaSocketExperiments",
	[]
	);
	
//-----------------------------------------------------------------------------
// 1st Semester - 3th Bachelor of Science in Engineering (2012-2013)
//-----------------------------------------------------------------------------
CreateProject("MIPS Samples",
    ["Matthias Moulin"],
    "Course: Computer Architecture and System Software (B-KUL-H01P5A), December 2012",
    "res/Projects/MIPSSamples/Thumbnail.png", 12, 2012,
    "https://github.com/matt77hias/MIPSSamples",
	[]
	);

//-----------------------------------------------------------------------------
// 2nd Semester - 2nd Bachelor of Science in Engineering (2011-2012)
//-----------------------------------------------------------------------------
CreateProject("RoboRally",
    ["Matthias Moulin", "Ruben Pieters"],
    "Course: Object Oriented Programming (B-KUL-H01P1A), June 2012",
    "res/Projects/RoboRally/Thumbnail.png", 6, 2012,
    "https://github.com/matt77hias/RoboRally",
	[]
	);

//-----------------------------------------------------------------------------
// 1st Semester - 2nd Bachelor of Science in Engineering (2011-2012)
//-----------------------------------------------------------------------------
CreateProject("Aurora",
	["Matthias Moulin", "Nathan Moesen", "Pieter Marynissen", "Sebastiaan Maes", "Sophie Marien", "Tom Molderez"],
    "Course: Problem Solving and Design, Part 3 (B-KUL-H01D4B), December 2011",
    "res/Projects/Aurora/Thumbnail.png", 12, 2011,
    "https://github.com/matt77hias/Aurora",
	[new Download("Play", "https://aurora--cwb1.appspot.com/",                           "res/Icons/icon-html.png"),
	 new Download("Wiki", "http://ariadne.cs.kuleuven.be/mediawiki/index.php/CWB1-1112", "res/Icons/icon-html.png")
	]
	);
	
//-----------------------------------------------------------------------------
// 2nd Semester - 1st Bachelor of Science in Engineering (2010-2011)
//-----------------------------------------------------------------------------
CreateProject("Crossbow Tennis Machine",
    ["Bart Opsomer", "Ben Praet", "Egon Blyweert", "Frederick Puttemans", "Jeroen Colon", "Joris Panis", "Louis Ponet", "Matthias Moulin", "Nick Berlanger"],
    "Course: Problem Solving and Design, Part 2 (B-KUL-H01C2A), June 2011",
    "res/Projects/CrossbowTennisMachine/Thumbnail.png", 6, 2011,
    "https://matt77hias.github.io/private",
	[new Download("Teaser", "https://www.youtube.com/watch?v=TLGgxP7FdLA", "res/Icons/icon-html.png")]
	);

//-----------------------------------------------------------------------------
// 1st Semester - 1st Bachelor of Science in Engineering (2010-2011)
//-----------------------------------------------------------------------------
CreateProject("MandeLboat",
	["Ben Allaerts", "Egon Pittoors", "Jef Aendekerk", "Julian Bouckenooghe", "Matthias Moulin", "Robin Clerckx", "Stijn Meylemans", "Wout Behaeghel"],
    "Course: Problem Solving and Design, Part 1 (B-KUL-H01B9A), December 2010",
    "res/Projects/MandeLboat/Thumbnail.png", 12, 2010,
    "https://matt77hias.github.io/private",
	[]
	);
