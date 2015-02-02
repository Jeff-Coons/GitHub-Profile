function renderTemplate(templateID, container, model) {
  var templateString = $('#' + templateID).text();
  var templateFunction = _.template(templateString);
  var renderedTemplate = templateFunction(model);
  $(container).append(renderedTemplate);
}

$.getJSON('https://api.github.com/users/jeff-coons').done(function(profile) {
  var profileData = {
    avatarImg: profile.avatar_url,
    username: profile.login,
    person: profile.name,
    location: profile.location,
    email: profile.email,
    creationDate: moment(profile.created_at).format('MMM D YYYY'),
    followers: profile.followers,
    followersUrl: profile.followers_url,
    following: profile.following,
    followingUrl: profile.following_url,
  };
  $.getJSON('https://api.github.com/users/jeff-coons/starred').done(function(star) {
    profileData.starData = star.length;
    renderTemplate('profile-sidebar', '.sidebar', profileData);
  });
});

$.getJSON('https://api.github.com/users/jeff-coons/repos').done(function(objects) {
  var repoData = _.map(objects, function(repos) {
    return {
      projectUrl: repos.html_url,
      projectName: repos.name,
      repoDescription: repos.description,
      updatedTime: moment(repos.updated_at).fromNow(),
      type: repos.language,
      starredUrl: repos.stargazers_url,
      forksUrl: repos.forks_url,
    };
  });
  _.each(repoData, function(model) {
    renderTemplate('repository', '.repository-body', model);
  });
});
