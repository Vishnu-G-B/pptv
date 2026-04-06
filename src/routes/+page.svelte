<script>
    import BentoBox from "$lib/components/common/BentoBox.svelte";
    import Landing from "$lib/components/PPLlabs/Landing.svelte";
    import ArcedCards from "$lib/components/common/ArcedCards.svelte";
    import Footer from "$lib/components/common/Footer.svelte";
    import ImgNav from "$lib/components/common/ImgNav.svelte";
    import Watchlist from "$lib/components/common/watchlist.svelte";
    import Timeline from "$lib/components/Timeline2/Timeline.svelte";
    import ProjectGullak from "$lib/components/common/ProjectGullak.svelte";
    import ContactForm from "$lib/components/common/ContactForm.svelte";

    // Vimeo placeholder — same as used in BentoBox
    const VIMEO_PLACEHOLDER = '1072992217';

    let timelineData = [
        {
            year: 'Academic Creators Lab',
            logo: 'PPLlogo.png',
            items: [
                {
                    title: "World's Highest Academic Creators Lab for Schools",
                    subtitle: "Purple People Labs – Leh, Ladakh (Established 2024)",
                    text: "Launched under the PM eVidya mission of the Ministry of Education, the Content Creators Lab in Leh, Ladakh is India's highest academic film studio dedicated to schools. Designed to empower teachers as content creators for five television channels allocated to the Union Territory of Ladakh, the Lab combines curriculum design, studio infrastructure and film pedagogy training to enable schools as content creators.",
                    fullText: "Launched under the PM eVidya mission of the Ministry of Education, the Content Creators Lab in Leh, Ladakh is India's highest academic film studio dedicated to schools. Designed to empower teachers as content creators for five television channels allocated to the Union Territory of Ladakh, the Lab combines curriculum design, studio infrastructure and film pedagogy training to enable schools as content creators.\n\nThe project continues to run as an ongoing teacher training and content production initiative. Through sustained capacity-building and film pedagogy training we address Ladakh's unique geographical and cultural context while strengthening digital, creative and life skills to empower teachers and students to produce impactful content for national & global audiences.\n\nOver the years, this Content Creators Lab has enabled the development of original content for the Ladakh School Education Department, including academic programmes, children's debate shows, panel discussions, performing and visual arts-based learning series and community storytelling initiatives.",
                    vimeoId: VIMEO_PLACEHOLDER,
                    meta: [{ label: 'Established', value: '2024' }],
                    supporters: [
                        { heading: 'Year 2024 Project By', names: ['Union Territory Of Ladakh', 'Ladakh Autonomous Hill Development Council, Leh'] },
                        { heading: 'Venue & Teacher Training Support By', names: ['District Institute of Education and Training (DIET), Leh, Ladakh'] },
                        { heading: 'Studio Design, Curriculum Development & Content Production By', names: ['Purple People Labs, Mumbai'] }
                    ]
                }
            ]
        },
        {
            year: 'Kidding Around Bharat',
            logo: 'Kidding Around Bharat.png',
            items: [
                {
                    title: 'Educational Tours Integrating Rural Impact + Film & Media Skills',
                    subtitle: 'A Collaborative Initiative with EducationWorld Foundation',
                    text: "Kidding Around Bharat is a collaborative educational tours initiative with the EducationWorld Foundation, designed to empower students with film & media skills to further promote rural tourism, cultural exchange and community storytelling across India.",
                    fullText: "Kidding Around Bharat is a collaborative educational tours initiative with the EducationWorld Foundation, designed to empower students with film & media skills to further promote rural tourism, cultural exchange and community storytelling across India.\n\nDesigned as a community exchange and filmmaking initiative, KAB enables students to explore India beyond textbooks — connecting with people, places and traditions, while learning filmmaking and photography as tools for expression and reflection.\n\nAt its core, KAB believes that: Children learn best when they step out of classrooms, connect with people, and tell stories from real life. Through purpose-led educational tours, students explore diverse regions of India, develop creative and media skills, reconnect with cultural roots, and contribute meaningfully to rural narratives through films.\n\nEach KAB tour results in student-created documentary films and travelogues that bring together learning, culture, creativity and community engagement in one powerful experience.",
                    vimeoId: VIMEO_PLACEHOLDER,
                    supporters: [
                        { heading: 'Tour Locations', names: ['Leh & Pangong – Ladakh (April to September, Grade 6–12)', 'Jodhpur & Raisar – Rajasthan (October to February, Grade 6–12)'] },
                        { heading: 'Supported By', names: ['Department Of School Education, U.T. Of Ladakh', 'Jodhpur School For Hearing & Speech Impaired', 'Kiran Nidhi Trust, Piplantri – Udaipur', 'Thakar Adivasi Kala Aangan Charitable Trust – Pinguli, Goa'] },
                        { heading: 'Initiative By', names: ['Purple People Labs & EducationWorld Foundation'] }
                    ]
                }
            ]
        },
        {
            year: 'ECA TV',
            logo: 'ecatv.png',
            items: [
                {
                    title: "India's First OTT Platform for Early Childhood Education",
                    subtitle: "In Collaboration with ECA & APER",
                    text: "ECA TV is an upcoming digital learning platform developed in collaboration with the Early Childhood Association (ECA) and the Association for Preparatory Education & Research (APER). Designed as a dedicated OTT ecosystem and Digital University for early years education.",
                    fullText: "ECA TV is an upcoming digital learning platform developed in collaboration with the Early Childhood Association (ECA) and the Association for Preparatory Education & Research (APER). Designed as a dedicated OTT ecosystem and Digital University for early years education, the platform will bring together teachers, parents, and young learners through engaging, research-driven audiovisual content.\n\nThe platform aims to transform how early childhood knowledge is shared by converting expert resources, training modules, and educational publications into accessible video-based learning experiences. From teacher masterclasses and classroom innovations to parenting guidance and children's edutainment, ECA TV will create a dynamic space where educators and families learn and grow together.\n\nAligned with the Government of India's vision for digital learning and the PM eVidya mission, ECA TV will also support the creation of original educational programming that can reach wider audiences through digital and broadcast platforms. Through initiatives such as Teacher Talkies, educators from across the ECA–APER network will be trained and featured as content creators.\n\nStay Tuned. ECA TV Coming Soon.",
                    vimeoId: VIMEO_PLACEHOLDER,
                    supporters: [
                        { heading: 'Project By', names: ['Early Childhood Association (ECA)', 'Association for Preparatory Education & Research (APER)'] },
                        { heading: 'Technology, Platform Development & Content Production By', names: ['Purple People Labs, Mumbai'] }
                    ]
                }
            ]
        }
    ];
</script>

<ImgNav/>
<Landing/>
<BentoBox/>
<div class="overflow-x-hidden">
    <Timeline data={timelineData}/>
</div>
<Watchlist/>
<ArcedCards/>
<ProjectGullak/>
<!--<ContactForm/>-->
<Footer/>
