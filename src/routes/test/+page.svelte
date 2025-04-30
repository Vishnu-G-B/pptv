<script>
    import Timeline from '$lib/components/Timeline2/Timeline.svelte';
    import img1 from "$lib/assets/images/Pragya Bodhini.webp"

    let timelineData = [
        {
            year: '2020-2022',
            items: [
                {
                    title: 'Event Alpha',
                    text: 'Description for the first event that happened in this year. Details about Alpha.',
                    imageUrl: img1
                },
                {
                    title: 'Event Beta',
                    text: 'A second significant occurrence. More details about Beta follow here.',
                    imageUrl: img1
                }
            ]
        },
        {
            year: '2022-2024',
            items: [
                {
                    title: 'Milestone Gamma',
                    text: 'The year started with Gamma. This milestone was crucial for future developments.',
                    imageUrl: img1
                },
                {
                    title: 'Project Delta Launch',
                    text: 'Successfully launched Project Delta, impacting the entire roadmap.',
                    imageUrl: img1
                },
                {
                    title: 'Innovation Epsilon',
                    text: 'Epsilon brought new ideas to the forefront later in the year.',
                    imageUrl: img1
                }
            ]
        },
        {
            year: '2025-∞',
            items: [
                {
                    title: 'Future Initiative Zeta',
                    text: 'Planning commenced for Zeta, setting the stage for the next phase.',
                    imageUrl: img1
                }
            ]
        }

    ];
</script>

<div class="overflow-x-hidden">
    <Timeline data={timelineData}/>
</div>