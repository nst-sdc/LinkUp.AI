const certificateMap = {
    'full stack developer': [
      {
        title: 'Full-Stack Web Development with React',
        issuer: 'Coursera',
        level: 'Intermediate',
        image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
      },
      {
        title: 'Meta Full Stack Developer Professional Certificate',
        issuer: 'Meta',
        level: 'Advanced',
        image: 'https://1000logos.net/wp-content/uploads/2021/04/Facebook-logo.png',
      },
      {
        title: 'MongoDB Developer Certification',
        issuer: 'MongoDB',
        level: 'Intermediate',
        image: 'https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg',
      },
    ],
    'mobile app developer': [
      {
        title: 'Associate Android Developer',
        issuer: 'Google',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Android_robot.svg/640px-Android_robot.svg.png',
      },
      {
        title: 'Flutter Developer Certification',
        issuer: 'Google',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/Google-flutter-logo.png',
      },
      {
        title: 'iOS App Development with Swift',
        issuer: 'Apple',
        level: 'Intermediate',
        image: 'https://developer.apple.com/assets/elements/icons/swift/swift-64x64_2x.png',
      },
    ],
    'data scientist': [
      {
        title: 'IBM Data Science Professional Certificate',
        issuer: 'IBM',
        level: 'Beginner',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      },
      {
        title: 'Google Advanced Data Analytics Certificate',
        issuer: 'Google',
        level: 'Intermediate',
        image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      },
      {
        title: 'Certified Data Scientist',
        issuer: 'Data Science Council of America (DASCA)',
        level: 'Advanced',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKE1ZIWyn_Y1lJ2qnfRCbvWn3HRor2QIwwUw&s',
      },
    ],
    'ai/ml engineer': [
      {
        title: 'TensorFlow Developer Certificate',
        issuer: 'Google',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
      },
      {
        title: 'AWS Certified Machine Learning – Specialty',
        issuer: 'Amazon',
        level: 'Advanced',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPmX4RwcstzSzZvxQhq-84V_HxOdxobWxSiQ&s',
      },
      {
        title: 'AI Engineering Professional Certificate',
        issuer: 'IBM',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
      },
    ],
    'database administrator': [
      {
        title: 'Oracle Database Administrator Certified Associate',
        issuer: 'Oracle',
        level: 'Intermediate',
        image: 'https://cdn.iconscout.com/icon/free/png-512/oracle-226046.png',
      },
      {
        title: 'Microsoft Certified: Azure Database Administrator Associate',
        issuer: 'Microsoft',
        level: 'Intermediate',
        image: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-associate-badge.svg',
      },
      {
        title: 'MongoDB Certified DBA',
        issuer: 'MongoDB',
        level: 'Advanced',
        image: 'https://webassets.mongodb.com/_com_assets/cms/mongodb-logo-rgb-j6w271g1xn.jpg',
      },
    ],
    'cybersecurity analyst': [
      {
        title: 'CompTIA Security+',
        issuer: 'CompTIA',
        level: 'Beginner',
        image: 'https://images.credly.com/images/1d9d2038-abf7-49b4-a8db-c6fb884dfdb5/blob.png',
      },
      {
        title: 'Certified Ethical Hacker',
        issuer: 'EC-Council',
        level: 'Intermediate',
        image: 'https://blueshellsecurity.com/wp-content/uploads/2020/04/ceh.png',
      },
      {
        title: 'CISSP',
        issuer: 'ISC2',
        level: 'Advanced',
        image: 'https://esi.edu.sa/wp-content/uploads/2022/12/cissp-1.png',
      },
    ],
    'network engineer': [
      {
        title: 'Cisco Certified Network Associate (CCNA)',
        issuer: 'Cisco',
        level: 'Beginner',
        image: 'https://content.influencemap.org//site/data/001/361/1361662.png',
      },
      {
        title: 'Cisco Certified Network Professional (CCNP)',
        issuer: 'Cisco',
        level: 'Intermediate',
        image: 'https://images.credly.com/images/07f70c56-f067-458e-bbe5-736f055f0cce/CCNP_Enterprise_large.png',
      },
      {
        title: 'Juniper Networks Certified Associate (JNCIA)',
        issuer: 'Juniper',
        level: 'Intermediate',
        image: 'https://ipcisco.com/wp-content/uploads/JNCIP-SP.png',
      },
    ],
    'qa/automation tester': [
      {
        title: 'ISTQB Certified Tester – Foundation Level',
        issuer: 'ISTQB',
        level: 'Beginner',
        image: 'https://seetb.org/appdata/pics/c_p/66769c7f0ff557dcb600d2f1688ff340.png',
      },
      {
        title: 'Certified Selenium Professional',
        issuer: 'VSkills',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Selenium_Logo.png',
      },
      {
        title: 'Test Automation University Certification',
        issuer: 'Applitools',
        level: 'Beginner',
        image: 'https://agilizing.com/wp-content/uploads/2023/02/applitools-logo.png',
      },
    ],
    'ui/ux designer': [
      {
        title: 'Google UX Design Certificate',
        issuer: 'Google',
        level: 'Beginner',
        image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
      },
      {
        title: 'Adobe Certified Expert – UX Design',
        issuer: 'Adobe',
        level: 'Intermediate',
        image: 'https://revealing-project.eu/wp-content/uploads/2023/06/adobe.png'
      },
      {
        title: 'Interaction Design Specialization',
        issuer: 'Coursera',
        level: 'Intermediate',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/600px-Coursera-Logo_600x600.svg.png',
      },
    ],
    'blockchain developer': [
      {
        title: 'Certified Blockchain Developer',
        issuer: 'Blockchain Council',
        level: 'Intermediate',
        image: 'https://img.freepik.com/premium-vector/creative-modern-digital-technology-logo-monogram-logo-initials-logo_1128796-80.jpg',
      },
      {
        title: 'Ethereum Developer Certification',
        issuer: 'Consensys',
        level: 'Intermediate',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUOFcpfD1bMe-2lg8ql_p6MHxSY8q6X_L_WQ&s',
      },
      {
        title: 'Hyperledger Fabric Certification',
        issuer: 'Linux Foundation',
        level: 'Intermediate',
        image: 'https://www.bigdatawire.com/wp-content/uploads/2016/05/Linux-Foundation-Logo.png',
      },
    ],
    'frontend developer': [
        {
          title: 'Certified Front End Developer',
          issuer: 'W3C',
          level: 'Beginner',
          image: 'https://cdn-icons-png.flaticon.com/512/888/888879.png',
        },
        {
          title: 'React Developer Certification',
          issuer: 'Meta',
          level: 'Intermediate',
          image: 'https://cdn.worldvectorlogo.com/logos/react-2.svg',
        },
        {
          title: 'Google Mobile Web Specialist',
          issuer: 'Google',
          level: 'Intermediate',
          image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
        },
        {
          title: 'HTML/CSS Developer Certification',
          issuer: 'freeCodeCamp',
          level: 'Beginner',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIaP8_UE7VErUvlvcaOxDnvyjeujSKhUx8Rg&s'
          ,

        },
      ],
      'backend developer': [
        {
          title: 'Node.js Developer Certification',
          issuer: 'OpenJS Foundation',
          level: 'Intermediate',
          image: 'https://i0.wp.com/andrewbeeken.co.uk/wp-content/uploads/2018/11/nodejs.jpg?fit=1200%2C675&ssl=1',
        },
        {
          title: 'Java SE 11 Developer',
          issuer: 'Oracle',
          level: 'Intermediate',
          image: 'https://edukier.pl/wp-content/uploads/java-logo-850x601.png',

        },
        {
          title: 'Django for Python Developers',
          issuer: 'Coursera',
          level: 'Beginner',
          image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Django_logo.svg',
        },
      ],
      'cloud engineer': [
        {
          title: 'AWS Certified Solutions Architect',
          issuer: 'Amazon',
          level: 'Intermediate',
          image: 'https://cdn.shopaccino.com/igmguru/products/aws-certified-solutions-architect--associate-saa-c03-training-609497492585114_m.jpg?v=531',
        },
        {
          title: 'Google Associate Cloud Engineer',
          issuer: 'Google',
          level: 'Beginner',
          image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtbWElSHs9TMy4O3HZfL3l15cd9UhfjRCXVw&s',
        },
        {
          title: 'Microsoft Certified: Azure Fundamentals',
          issuer: 'Microsoft',
          level: 'Beginner',
          image: 'https://learn.microsoft.com/en-us/media/learn/certification/badges/microsoft-certified-fundamentals-badge.svg',
        },
      ],
      'devops': [
        {
          title: 'Certified Kubernetes Administrator',
          issuer: 'CNCF',
          level: 'Intermediate',
          image: 'https://training.linuxfoundation.org/wp-content/uploads/2018/06/logo_cka_whitetext.png',
        },
        {
          title: 'AWS Certified DevOps Engineer',
          issuer: 'Amazon',
          level: 'Advanced',
          image: 'https://d1.awsstatic.com/onedam/marketing-channels/website/aws/en_US/certification/approved/images/certification-badges/dop-badge-resized.3c0f93f6f99b2baa1eed84813f2fbac054339f15.png',
        },
        {
          title: 'Docker Certified Associate',
          issuer: 'Docker',
          level: 'Intermediate',
          image: 'https://www.zadara.com/wp-content/uploads/docker.png',
        },
      ],
      'data analyst': [
        {
          title: 'Google Data Analytics Certificate',
          issuer: 'Google',
          level: 'Beginner',
          image: 'https://cdn-icons-png.flaticon.com/512/281/281764.png',
        },
        {
          title: 'IBM Data Analyst Professional Certificate',
          issuer: 'IBM',
          level: 'Intermediate',
          image: 'https://www.gesi.org/wp-content/uploads/2024/08/purepng.com-ibm-logologobrand-logoiconslogos-251519939176ka7y8.png',
        },
        {
          title: 'Microsoft Certified: Data Analyst Associate',
          issuer: 'Microsoft',
          level: 'Intermediate',
          image: 'https://yt3.googleusercontent.com/ytc/AIdro_kXVj3MGEZAiw5LFOtWMYpl9EHk45elb6SpEWfIigi3_3M=s900-c-k-c0x00ffffff-no-rj',
        },
      ],
      'machine learning': [
        {
          title: 'TensorFlow Developer Certificate',
          issuer: 'Google',
          level: 'Intermediate',
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg',
        },
        {
          title: 'Machine Learning Specialization',
          issuer: 'Coursera (Andrew Ng)',
          level: 'Intermediate',
          image: 'https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png?auto=format%2Ccompress&dpr=1',
        },
        {
          title: 'AWS Certified Machine Learning - Specialty',
          issuer: 'Amazon',
          level: 'Advanced',
          image: 'https://miro.medium.com/v2/resize:fit:268/1*mF_lERjGP16iLrsS6ZyAag.png',
        },
      ],
  };
  
  export default certificateMap;
  