<script lang="ts">
	import type { Year, Month } from '$lib/types';

	export let years: Array<Year> = [];
	export let showDays = false;

	let selectedYear: Year, selectedMonth: Month;

	$: selectedYear = years.find((e) => e.number === selected.year);
	$: selectedMonth = selectedYear
		? selectedYear.months.find((e) => e.number === selected.month)
		: null;

	export let selected = {
		year: years[0]?.number || 2021,
		month: selectedYear?.months[0]?.number || 6,
		day: 1
	};
</script>

<div class="d-flex gap-2">
	<select bind:value={selected.year} class="form-select" aria-label="Year">
		{#each years as year (year.number)}
			<option value={year.number}>{year.number}</option>
		{/each}
	</select>
	<select bind:value={selected.month} class="form-select" aria-label="Month">
		{#if selectedYear}
			{#each selectedYear.months as month (month.number)}
				<option value={month.number}>{month.number}</option>
			{/each}
		{/if}
	</select>
	{#if showDays}
		<select bind:value={selected.day} class="form-select" aria-label="Day">
			{#if selectedMonth}
				{#each selectedMonth.days as day (day)}
					<option value={day}>{day}</option>
				{/each}
			{/if}
		</select>
	{/if}
</div>
