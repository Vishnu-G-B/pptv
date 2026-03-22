<script>
    import BentoBox from "$lib/components/common/BentoBox.svelte";
    import Landing from "$lib/components/PPLlabs/Landing.svelte";
    import ArcedCards from "$lib/components/common/ArcedCards.svelte";
    import Footer from "$lib/components/common/Footer.svelte";
    import ImgNav from "$lib/components/common/ImgNav.svelte";
    import Watchlist from "$lib/components/common/watchlist.svelte";
    import FlashcardParent from "$lib/components/common/FlashcardParent.svelte";
    import Timeline from "$lib/components/Timeline2/Timeline.svelte";
    import EcatvSection from "$lib/components/common/EcatvSection.svelte";
    import ProjectGullak from "$lib/components/common/ProjectGullak.svelte";

    // Vimeo placeholder ID — same as used in BentoBox
    const VIMEO_PLACEHOLDER = '1072992217';

    let timelineData = [
        {
            year: 'PPL Leh Ladakh',
            items: [
                {
                    title: "World's Highest Academic Creators Lab for Schools",
                    text: "Launched under the PM eVidya mission of the Ministry of Education, the Content Creators Lab in Leh, Ladakh is India's highest academic film studio dedicated to schools. Designed to empower teachers as content creators for five television channels allocated to the Union Territory of Ladakh, the Lab combines curriculum design, studio infrastructure and film pedagogy training to enable schools as content creators of 10 original educational IPs, 300+ episodes of curriculum-aligned content, and teacher- and student-led audiovisual productions. The project continues to run as an ongoing teacher training and content production initiative.",
                    vimeoId: VIMEO_PLACEHOLDER,
                    meta: [
                        { label: 'Year', value: '2024' }
                    ],
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
            items: [
                {
                    title: 'Educational Tours Integrating Rural Impact + Film & Media Skills',
                    text: "Kidding Around Bharat is a collaborative educational tours initiative with the EducationWorld Foundation, designed to empower students with film & media skills to further promote rural tourism, cultural exchange and community storytelling across India. Designed as a community exchange and filmmaking initiative, KAB enables students to explore India beyond textbooks — connecting with people, places and traditions, while learning filmmaking and photography as tools for expression and reflection. Each KAB tour results in student-created documentary films and travelogues that bring together learning, culture, creativity and community engagement in one powerful experience.",
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
            items: [
                {
                    title: "India's First OTT Platform for Early Childhood Education",
                    text: "ECA TV is an upcoming digital learning platform developed in collaboration with the Early Childhood Association (ECA) and the Association for Preparatory Education & Research (APER). Designed as a dedicated OTT ecosystem and Digital University for early years education, the platform will bring together teachers, parents, and young learners through engaging, research-driven audiovisual content. The platform aims to transform how early childhood knowledge is shared by converting expert resources, training modules, and educational publications into accessible video-based learning experiences. Stay Tuned, ECA TV Coming Soon.",
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
<div class="overflow-x-hidden">
    <Timeline data={timelineData}/>
</div>
<BentoBox/>
<Watchlist/>
<FlashcardParent/>
<ArcedCards/>
<EcatvSection/>
<ProjectGullak/>
<Footer/>
